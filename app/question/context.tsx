import dayjs from "dayjs";
import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { noopFunction } from "~/util";
import type { Question } from "./types";

const context = createContext<{
  question: Question;
  setQuestion: React.Dispatch<React.SetStateAction<Question>>;
}>({
  setQuestion: noopFunction,
  question: {
    id: -1,
    originalId: -1,
    content: {
      type: "short_order",
      corrects: [],
      id: "",
      message: "",
    },
    createdAt: dayjs(),
    deletedAt: null,
    publicId: "not_initialized",
    updatedAt: dayjs(),
    tags: [],
  },
});

export function QuestionProvider({
  question: questionProp,
  children,
}: {
  question: Question;
  children: ReactNode;
}) {
  const [question, setQuestionState] = useState(questionProp);

  useEffect(() => {
    setQuestionState((prev) => {
      // content 만 업데이트하지 않는다.
      return {
        ...questionProp,
        content: prev.content,
      };
    });
  }, [questionProp]);

  return (
    <context.Provider value={{ question, setQuestion: setQuestionState }}>
      {children}
    </context.Provider>
  );
}

export function useQuestion() {
  const { question } = useContext(context);

  if (question.publicId === "not_initialized") {
    throw new Error("QuestionProvider is not initialized");
  }

  return question;
}

export function useQuestionContext() {
  return useContext(context);
}

export function useSetQuestion() {
  const { setQuestion } = useContext(context);

  return setQuestion;
}