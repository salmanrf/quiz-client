import type { Question } from "../quiz/Quiz.interface";

export interface Room {
  title: string;
  code?: string;
  admin_name?: string;
  password?: string;
  used_quota?: number;
  quota: number;
  quiz_code?: string;
}

export interface RoomQuizData {
  questions: Question[];
}
