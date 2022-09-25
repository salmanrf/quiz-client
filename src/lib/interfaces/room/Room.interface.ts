import type { Question } from "../quiz/Quiz.interface";

export interface Room {
  title: string;
  code: string;
  used_quota: number;
  quota: number;
}

export interface RoomGeneralData {
  title: string;
  admin_name: string;
  password: string;
  quota: number;
}

export interface RoomQuizData {
  questions: Question[];
}
