export type Category = "1" | "2" | "3";
export type Tag = `${number}일차` | "핵심 서브노트 110제" | string;

export interface IBaseQuestion {
  id: string;
  message: string;
  weight?: number;
  tags?: Tag[];
  ignoreWhitespace?: boolean;
}

export interface IShortQuestion extends IBaseQuestion {
  type: "short";
  correct: string;
}

// 답이 여러개이고, 순서가 중요함. ", " 등으로 구분함.
export interface IShortOrderQuestion extends IBaseQuestion {
  type: "short_order";
  corrects: string[];
}

export interface IShortMultiAnswerQuestion extends IBaseQuestion {
  type: "short_multi";
  corrects: string[];
}

export interface IPickOrderQuestion extends IBaseQuestion {
  type: "pick_order";
  corrects: string[];
  otherChoices?: string[];
}

export interface IPickQuestion extends IBaseQuestion {
  type: "pick";
  correct: string;
  options: string[];
}

export interface IPickMultiQuestion extends IBaseQuestion {
  type: "pick_multi";
  corrects: string[];
  options: string[];
}

/** unused */
export interface IPickDifferentQuestion extends IBaseQuestion {
  type: "pick_different";
  pool: string[][];
}

export type Question =
  | IShortQuestion
  | IShortOrderQuestion
  | IShortMultiAnswerQuestion
  | IPickDifferentQuestion
  | IPickQuestion
  | IPickMultiQuestion
  | IPickOrderQuestion;

export interface IBaseProcessedArgs {
  given: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ISuccessArgs extends IBaseProcessedArgs {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IFailArgs extends IBaseProcessedArgs {}

export type QuestionInputProps<T extends Question = Question> = {
  question: T;
  onSuccess?: (args: ISuccessArgs) => void;
  onFail?: (args: IFailArgs) => void;
};
