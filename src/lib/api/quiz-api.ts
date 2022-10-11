import type { ApiResponse } from "src/lib/models/api/Response.interface";
import type { Quiz } from "src/lib/models/quiz/Quiz.interface";

const QUIZ_URL = "http://192.168.0.16:8080/api/quiz";

export interface CreateQuizResponse {
  title: string;
  code: string;
}

export async function fetchCreateQuiz(quiz: Quiz) {
  try {
    const body = JSON.stringify(quiz);

    const res = await fetch(QUIZ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    const result: Promise<ApiResponse<CreateQuizResponse>> = await res.json();

    return result;
  } catch (error) {
    throw error;
  }
}

export async function fetchFindQuizzes() {
  try {
    const res = await fetch(QUIZ_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();

    return result;
  } catch (error) {
    throw error;
  }
}
