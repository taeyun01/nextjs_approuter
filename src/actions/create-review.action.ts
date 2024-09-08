"use server";

// 서버액션을 통해 리뷰 추가하기
export const createReviewAction = async (formData: FormData) => {
  //* 컴포넌트의 Props로 부터 bookId값을 전달 받을 수 없기 때문에 formData통해서 함께 전달 받도록 한다.
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  if (!bookId || !content || !author) {
    return;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookId, content, author }),
      }
    );
    console.log(response.status);
  } catch (error) {
    console.log(error);
    return;
  }
};
