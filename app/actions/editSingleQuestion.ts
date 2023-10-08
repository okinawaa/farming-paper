import type { ActionFunctionArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";
import { getSessionWithProfile } from "~/auth/get-session";
import prisma from "~/prisma-client.server";
import { bigintToNumber } from "~/util";

export const actionValidator = withZod(
  /** TODO: fix to switch later. @see https://github.com/colinhacks/zod/issues/2106 */
  z.discriminatedUnion("intent", [
    z.object({ intent: z.literal("upsert_tag"), name: z.string() }),
    z.object({
      intent: z.literal("edit_question"),
      public_id: z.string(),
      content: z.string(),
    }),
  ])
);

async function editSingleQuestion({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const validated = await actionValidator.validate(formData);

  if (validated.error) {
    return json(
      {
        data: null,
        error: validated.error,
      },
      { status: 400 }
    );
  }

  if (validated.data.intent === "upsert_tag") {
    // ...
    return json(
      {
        data: null,
        error: "Not Implemented",
      },
      { status: 501 }
    );
  }

  const { content, public_id } = validated.data;
  const tagPublicIds = formData
    .getAll("tag_public_id")
    .map((v) => v.toString());

  const response = new Response();

  const { profile } = await getSessionWithProfile({
    request,
    response,
  });

  const updatedQuestion = await prisma.questions.update({
    where: {
      public_id,
      creator: profile.id,
    },
    data: {
      content: JSON.parse(content),
    },
  });

  // 현재 문제와 태그의 관계를 가져옵니다.
  const [existingTagsRes, editingDataTagsRes] = await Promise.all([
    prisma.tags_questions_relation.findMany({
      where: { q: updatedQuestion.id },
      include: { tags: true },
    }),
    prisma.tags.findMany({
      where: { public_id: { in: tagPublicIds }, deleted_at: null },
    }),
  ]);

  const existingTags = existingTagsRes.map((t) => t.tags);
  const editingDataTags = editingDataTagsRes;

  // 원래 있는 태그 중 새로운 태그에 없는 태그들을 삭제합니다. (순수하게 삭제할 태그만 남깁니다.)
  const removingTags = existingTags.filter(
    (existingTag) =>
      !editingDataTags.some(
        (newTag) => newTag.public_id === existingTag.public_id
      )
  );

  // 새로운 태그 중 원래 있는 태그에 없는 태그들을 삭제합니다. (순수하게 추가할 태그만 남깁니다.)
  const addingTags = editingDataTags.filter(
    (newTag) => !existingTags.some((tag) => tag.public_id === newTag.public_id)
  );

  await Promise.all([
    prisma.tags_questions_relation.deleteMany({
      where: {
        tag: { in: removingTags.map((t) => t.id) },
        q: updatedQuestion.id,
      },
    }),

    prisma.tags_questions_relation.createMany({
      data: addingTags.map((addingTag) => ({
        q: updatedQuestion.id,
        tag: addingTag.id,
      })),
    }),
  ] as const);

  return json({
    data: {
      ...updatedQuestion,
      id: bigintToNumber(updatedQuestion.id),
      creator: bigintToNumber(updatedQuestion.creator),
    },
    error: null,
  });
}

export default editSingleQuestion;
