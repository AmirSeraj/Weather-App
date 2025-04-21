import { Dispatch } from "react";

export type initialStateType = {
  questions: any[];
  status: "loading" | "error" | "ready" | "active" | "finished";
  index: number;
  secondsRemaining: number;
  answer: number | null;
  hasAnswered: boolean;
  points: number;
};

type QuestionType = {
  question: string;
  options: string[];
  correctOption: number;
};

export type QuestionFileType = {
  index: number;
  questions: QuestionType[];
  points: number;
  totalPoints: number;
  currentQuestion: QuestionType;
  answer: number | null;
  hasAnswered: boolean;
  minutes: string;
  seconds: string;
  dispatch: Dispatch<ActionType>;
};

type ActionType =
  | { type: "newAnswer"; payload: number }
  | { type: "nextQuestion" }
  | { type: "resetQuiz" };

export type initialStatePracticeType = {
  balance: number;
  loan: number;
  isOpen: boolean;
};

export type BtnArrayType = {
  className: string;
  color: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  title: string;
  onPress: () => void;
};
