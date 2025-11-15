
export interface QuestionOption {
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: number;
  text: string;
  options: QuestionOption[];
  category: string;
}

export interface UserAnswer {
  questionId: number;
  selectedOption: string;
  isCorrect: boolean;
}

export enum QuizState {
  NotStarted,
  InProgress,
  Completed,
}
