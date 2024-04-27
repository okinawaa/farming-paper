import { Button, ButtonGroup, Link } from "@nextui-org/react";
import type { tags } from "@prisma/client";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData, useSearchParams } from "@remix-run/react";
import dayjs from "dayjs";
import { Plus, Tag, Trash2 } from "lucide-react";
import { useMemo } from "react";
import { z } from "zod";
import dashboardAction from "~/actions/dashboard";
import { requireAuth } from "~/auth/get-session";
import DefaultLayout from "~/common/components/DefaultLayout";
import { DeleteQuestionModalWithButton } from "~/common/components/DeleteQuestionModalWithButton";
import { SetTagModal } from "~/common/components/SetTagModal";
import SideMenuV2 from "~/common/components/SideMenuV2";
import { defaultMeta } from "~/meta";
import prisma from "~/prisma-client.server";
import { QuestionProvider } from "~/question/context";
import { createQuestionContent } from "~/question/create";
import ParagrahEditor from "~/question/edit-components/ParagraphEditor";
import type { Question, QuestionContent } from "~/question/types";
import TagFilterChip from "~/tag/component/tag-filter-chip";
import useAddTagFilter from "~/tag/use-add-tag-filter";
import useDeleteTagFilter from "~/tag/use-delete-tag-filter";
import type { ITagWithCount } from "~/types";
import { getObjBigintToNumber } from "~/util";

export const meta: MetaFunction = () => {
  return [...defaultMeta, { title: "대시보드 | Farming Paper" }];
};

const searchParamsSchema = z.object({
  page: z.coerce.number().gte(1).default(1),
  tags: z
    .string()
    .optional()
    .transform((v) => v?.split(",")),
});

export async function loader({ request }: LoaderFunctionArgs) {
  const { profile } = await requireAuth(request);

  const obj = Object.fromEntries(new URL(request.url).searchParams);
  const validation = searchParamsSchema.safeParse(obj);
  if (!validation.success) {
    throw new Response(JSON.stringify({ error: validation.error }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { page, tags } = validation.data;

  const [questions, count, recentTags, allTags] = await Promise.all([
    prisma.questions.findMany({
      where: {
        creator: profile.id,
        deleted_at: null,
        tags_questions_relation: tags
          ? { some: { tags: { public_id: { in: tags } } } }
          : undefined,
      },
      orderBy: [{ created_at: "desc" }, { original_id: "asc" }],
      skip: (page - 1) * 10,
      take: 10,
      select: {
        id: true,
        original_id: true,
        content: true,
        created_at: true,
        updated_at: true,
        deleted_at: true,
        public_id: true,
        tags_questions_relation: {
          select: { tags: { select: { name: true, public_id: true } } },
        },
      },
    }),

    prisma.questions.count({
      where: {
        creator: profile.id,
        deleted_at: null,
        tags_questions_relation: tags
          ? { some: { tags: { public_id: { in: tags } } } }
          : undefined,
      },
    }),

    // 최근에 추가된 문제에 해당하는 태그 10개
    prisma.$queryRaw`
      SELECT tags.public_id, tags.name, MAX(questions.created_at) as last_q_date
      FROM tags
      INNER JOIN tags_questions_relation ON tags.id = tags_questions_relation.tag
      INNER JOIN questions ON questions.id = tags_questions_relation.q
      WHERE questions.creator = ${profile.id} AND questions.deleted_at IS NULL
      GROUP BY tags.public_id, tags.name
      ORDER BY last_q_date DESC
      LIMIT 10;
    ` as Promise<
      (Pick<tags, "public_id" | "name"> & { last_q_date: string })[]
    >,

    // 모든 태그
    prisma.tags.findMany({
      where: {
        creator: profile.id,
        deleted_at: null,
      },
      orderBy: [{ created_at: "asc" }, { public_id: "asc" }],
      select: {
        public_id: true,
        name: true,
        desc: true,
        _count: {
          select: {
            tags_questions_relation: true,
          },
        },
      },
    }),
  ]);

  return json({
    questions: questions.map((q) => {
      return {
        ...getObjBigintToNumber(q),
        content: createQuestionContent(q.content as Partial<QuestionContent>),
      };
    }),
    count,
    recentTags,
    activeTagPublicIds: tags,
    allTags: allTags.map((tag): ITagWithCount => {
      const result: ITagWithCount = {
        name: tag.name || "",
        publicId: tag.public_id,
        count: tag._count.tags_questions_relation,
      };
      if (tag.desc) {
        result.desc = tag.desc;
      }
      return result;
    }),
  });
}

export default function Dashboard() {
  const data = useLoaderData<typeof loader>();
  const [params] = useSearchParams();

  const { count, recentTags, activeTagPublicIds } = data;

  const tagFilters = useMemo(() => {
    const activeTagPublicIdsSet = new Set(activeTagPublicIds);
    return recentTags.map((tag) => ({
      publicId: tag.public_id,
      name: tag.name || "",
      active: activeTagPublicIdsSet.has(tag.public_id),
    }));
  }, [activeTagPublicIds, recentTags]);

  const addTagFilter = useAddTagFilter();

  const deleteTagFilter = useDeleteTagFilter();

  const questions: Question[] = useMemo(
    () =>
      data.questions.map(
        (q): Question => ({
          id: q.id,
          originalId: q.original_id,
          content: q.content,
          createdAt: dayjs(q.created_at),
          updatedAt: dayjs(q.updated_at),
          deletedAt: q.deleted_at ? dayjs(q.deleted_at) : null,
          publicId: q.public_id,
          tags: q.tags_questions_relation.map((t) => {
            return {
              name: t.tags.name || "",
              publicId: t.tags.public_id,
            };
          }),
        })
      ),
    [data.questions]
  );

  return (
    <DefaultLayout sidebarTop={<SideMenuV2 />}>
      <div
        className="box-border px-10 mx-auto mt-20"
        style={{ width: "calc(700px + 3rem)" }}
      >
        {/* tags */}
        <div className="flex flex-wrap gap-2.5 mb-4">
          {tagFilters.map((tag) => {
            if (tag.name) {
              return (
                <TagFilterChip
                  key={tag.publicId}
                  name={tag.name}
                  active={tag.active}
                  onClick={() => {
                    if (tag.active) {
                      deleteTagFilter(tag.publicId);
                    } else {
                      addTagFilter(tag.publicId);
                    }
                  }}
                />
              );
            }
            return null;
          })}
        </div>

        {/* header toolbar */}
        <div className="flex items-center gap-4 mb-10 ">
          <Form method="post">
            <input type="hidden" name="intent" value="create_question" />
            <Button
              isIconOnly
              variant="shadow"
              className="text-white bg-primary min-w-11"
              type="submit"
            >
              <span className="sr-only">단락 추가</span>
              <Plus className="w-4.5 h-4.5 " aria-hidden />
            </Button>
          </Form>
          {(activeTagPublicIds || []).length > 0 && (
            <div className="flex items-center gap-4">
              <ButtonGroup variant="shadow">
                <Button
                  as={Link}
                  className="text-white bg-primary min-w-11"
                  href={`/solve?tags=${params.get("tags")}`}
                >
                  <span>
                    Solve <span className="font-bold">{count}</span> Question
                    {count > 1 ? "s" : ""}
                  </span>
                </Button>
                {/* <Button
                  className="text-gray-600 bg-gray-50 min-w-11"
                  isIconOnly
                >
                  <span className="sr-only">일괄 수정</span>
                  <FileEdit className="w-4.5 h-4.5" aria-hidden />
                </Button>
                <Button
                  className="text-gray-600 bg-gray-50 min-w-11"
                  isIconOnly
                >
                  <span className="sr-only">일괄 삭제</span>
                  <Trash2 className="w-4.5 h-4.5 " aria-hidden />
                </Button> */}
              </ButtonGroup>
            </div>
          )}
        </div>

        {/* questions */}
        <div className="space-y-2">
          {questions.map((question, index) => {
            return (
              // question group
              <QuestionProvider
                key={question.originalId || question.id}
                question={question}
              >
                <div className="group">
                  {/* question header */}
                  <div className="flex transition opacity-0 group-hover:opacity-100 group-has-[*:focus]:opacity-100 group-has-[[aria-expanded=true]]:opacity-100">
                    <div
                      className="flex items-center py-1 text-xs text-gray-400 gap-2.5 overflow-hidden select-none"
                      style={{ backgroundColor: "rgba(249, 250, 251, 0.3)" }}
                    >
                      <span className="font-mono font-bold">
                        {question.createdAt.format("YYYY.MM.DD.")}
                      </span>
                      {question.tags.length > 0 && (
                        <div className="flex items-center gap-0.5">
                          <Tag className="w-2.5 h-2.5 text-gray-300" />
                          <span>
                            {question.tags.map((t) => t.name).join(", ")}
                          </span>
                        </div>
                      )}
                      <SetTagModal
                        tags={data.allTags}
                        TriggerButton={({ onPress }) => (
                          <Button
                            onPress={onPress}
                            variant="light"
                            className="h-auto min-w-0 pl-0.5 py-0.5 pr-1  text-xs font-bold rounded-sm text-inherit gap-0.5"
                            startContent={
                              <Plus className="w-3 h-3 text-gray-300 " />
                            }
                            disableRipple
                          >
                            태그 추가
                          </Button>
                        )}
                      />
                      <DeleteQuestionModalWithButton
                        TriggerButton={({ onPress }) => (
                          <Button
                            onPress={onPress}
                            variant="light"
                            className="h-auto min-w-0 px-1 py-1 rounded-sm text-inherit"
                          >
                            <Trash2 className="w-3.5 h-3.5 " />
                          </Button>
                        )}
                      />
                    </div>
                  </div>

                  {/* question content */}
                  <div className="flex -ml-6">
                    <span
                      className="flex-none ml-1 mr-2 font-mono text-xs text-gray-400 select-none"
                      style={{ lineHeight: "1.75rem" }}
                    >
                      {index + 1}.
                    </span>
                    <div className="flex-1 text-gray-800">
                      <ParagrahEditor
                        key={question.originalId || question.id}
                        autoSave
                      />

                      {question.content.type === "short_order" && (
                        <div className="text-right">
                          {question.content.corrects.length > 0 && (
                            <span className="text-sm font-medium text-gray-400 select-none">
                              정답: {question.content.corrects.join(", ")}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </QuestionProvider>
            );
          })}
        </div>
      </div>
    </DefaultLayout>
  );
}

export const action = dashboardAction;