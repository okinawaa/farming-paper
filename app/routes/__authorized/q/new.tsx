import { MinusCircleOutlined } from "@ant-design/icons";
import { Form, useActionData, useFetcher } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/server-runtime";
import { Button, Input, Select } from "antd";
import { nanoid } from "nanoid";
import { useEffect, useMemo } from "react";
import type { FieldErrors, Resolver } from "react-hook-form";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import type { PartialDeep } from "type-fest";
import ErrorLabel from "~/components/ErrorLabel";
import Label from "~/components/Label";
import { createQuestion } from "~/question/create";
import type { Question } from "~/question/types";

type FormValues = {
  question: PartialDeep<Question>;
};

function validateMessage(message: string | string[] | undefined) {
  if (typeof message === "string" && message.length > 0) {
    return true;
  }
  if (
    Array.isArray(message) &&
    message.filter((message) => Boolean(message)).length > 0
  ) {
    return true;
  }

  return "필수 입력입니다.";
}

const questionTypeOptions = [
  {
    label: "단답형",
    value: "short",
  },
  {
    label: "단답형 (답 여러 개)",
    value: "short_multi",
  },
  {
    label: "단답형 (답 여러 개 + 순서)",
    value: "short_order",
  },
  {
    label: "다른 것 하나 고르기",
    value: "pick_different",
  },
  {
    label: "객관식",
    value: "pick",
  },
  {
    label: "객관식 (답 여러 개)",
    value: "pick_multi",
  },
  {
    label: "객관식 (답 여러 개 + 순서)",
    value: "pick_order",
  },
];

const formResolver: Resolver<FormValues> = async (values) => {
  const errors: FieldErrors<FormValues> = {};

  if (!values.question.message) {
    if (!errors.question) {
      errors.question = {};
    }

    errors.question.message = {
      type: "required",
      message: "필수 입력입니다.",
    };
  }

  const hasError = Object.keys(errors).length > 0;

  return {
    values: !hasError ? values : {},
    errors,
  };
};

type Corrects = { corrects: { id: string; c: string }[] };

const correctsResolver: Resolver<Corrects> = async (values) => {
  return {
    values,
  };
};

export default function QuestionNew() {
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
    register,
  } = useForm<FormValues>({
    resolver: formResolver,
    defaultValues: {
      question: {
        type: "short_order",
        message: "",
      },
    },
  });

  const { control: correctsControl, watch: correctsWatch } = useForm({
    resolver: correctsResolver,
    defaultValues: { corrects: [{ id: nanoid(), c: "" }] },
  });

  const data = useActionData<FormValues>(); //we access the return value of the action here

  const fetcher = useFetcher();

  const values = watch();

  const correctsFormValue = correctsWatch();

  // useEffect(() => {
  //   if (fetcher.type === "init") {
  //     fetcher.load("/some/route");
  //   }
  // }, [fetcher]);

  // fetcher.data; // the data from the loader

  useEffect(() => {
    console.log("data", data);
  }, [data]);
  useEffect(() => {
    console.log("values", values);
  }, [values]);

  // const errors = useMemo(() => {
  //   return {
  //     message: validateMessage(data?.question?.message),
  //   };
  // }, [data?.question.message]);

  const onSubmit = useMemo(
    () =>
      handleSubmit(async (formData) => {
        const q = createQuestion(formData.question);
        if (q.type === "short_order") {
          q.corrects = correctsFormValue.corrects.map((correct) => correct.c);
        }
        fetcher.submit(
          {
            formValues: JSON.stringify(q),
          },
          {
            method: "post",
            action: `/q/new`,
          }
        );
      }),
    [correctsFormValue.corrects, fetcher, handleSubmit]
  );

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control: correctsControl,
      name: "corrects",
    }
  );

  return (
    <div className="p-2">
      <h1 className="my-2 text-xl font-medium">새로운 문제 만들기</h1>
      <Form onSubmit={onSubmit}>
        <div className="flex flex-col mb-4">
          <Label htmlFor="question_message">타입</Label>
          <Controller
            control={control}
            name="question.type"
            render={({ field }) => {
              return (
                <Select
                  {...field}
                  options={questionTypeOptions}
                  id="question_type"
                />
              );
            }}
          />
        </div>
        <div className="flex flex-col mb-4">
          <Label htmlFor="question_message">내용</Label>
          <Controller
            control={control}
            name="question.message"
            render={({ field }) => {
              return (
                <Input.TextArea
                  {...field}
                  required
                  id="question_message"
                  placeholder="내용을 작성하세요"
                />
              );
            }}
          />
          {errors?.question?.message &&
            typeof errors.question.message !== "string" && (
              <ErrorLabel htmlFor="question_message">
                {errors.question.message.message}
              </ErrorLabel>
            )}
        </div>

        {/* ShortOrder corrects */}
        {values.question?.type === "short_order" && (
          <div className="flex flex-col mb-4">
            <Label htmlFor="correct">정답</Label>
            <div className="flex flex-col gap-2 mb-2">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <Controller
                    control={correctsControl}
                    name={`corrects.${index}.c`}
                    render={({ field }) => {
                      return <Input {...field} />;
                    }}
                  />

                  <button
                    className="inline-flex items-center p-2 bg-transparent"
                    type="button"
                    onClick={() => remove(index)}
                  >
                    <MinusCircleOutlined />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex">
              <Button
                onClick={() =>
                  append({
                    c: "",
                    id: nanoid(),
                  })
                }
              >
                추가
              </Button>
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <Button htmlType="submit" type="primary">
            만들기
          </Button>
        </div>
      </Form>
    </div>
  );
}

export const action: ActionFunction = async ({ request }) => {
  const data = Object.fromEntries(await request.formData()) as {
    formValues: string;
  };

  console.log(data.formValues);
  const formValues = JSON.parse(data.formValues) as { question: Question };
  console.log("formValues", formValues);
  // outputs { name: '', email: '', password: '', confirmPassword: '' }

  const formErrors = {
    message: validateMessage(data?.question?.message),
  };

  //if there are errors, we return the form errors
  if (Object.values(formErrors).some(Boolean)) {
    return { formErrors };
  }

  return { message: "success" };
};