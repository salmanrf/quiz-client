const QUIZ_URL = "http://localhost:8080/api/quiz";

export async function fetchCreateQuizzes() {
  try {
    const body = JSON.stringify({
      code: "ashquiz",
      title: "AshiapQuiz",
      questions: [
        {
          type: "multiple-answer",
          description: "",
          answers: [
            {
              value: "1",
              correct: true,
            },
            {
              value: "2",
              correct: true,
            },
            {
              value: "3",
              correct: false,
            },
          ],
        },
        {
          type: "single-answer",
          description: "",
          answers: [
            {
              value: "1",
              correct: true,
            },
            {
              value: "2",
              correct: false,
            },
            {
              value: "3",
              correct: false,
            },
          ],
        },
      ],
    });

    const res = await fetch(QUIZ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    const { body: data } = await res.json();

    return data;
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
