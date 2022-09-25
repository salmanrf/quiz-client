export interface Quiz {
  title: string;
  code: string;
  questions: Question[];
}

export interface Question {
  type: string;
  description: string;
  answers: Answer[];
  correct_answer: string;
}

export interface Answer {
  label: string;
  value: string;
  correct?: boolean;
}
