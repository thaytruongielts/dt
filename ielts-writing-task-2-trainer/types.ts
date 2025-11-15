
export interface IeltsTopic {
  ID: number;
  Topic: string;
  Prompt: string;
  Vietnamese_Translation: string;
  Type: string;
  Vocabulary: string[];
  Grammar_Structures: string[];
  Sample_Intro: string;
  Sample_Body1: string;
  Sample_Body2: string;
  Sample_Conclusion: string;
}

export enum WritingStage {
  Outline,
  Introduction,
  Body1,
  Body2,
  Conclusion,
  Review,
  Finished,
}
