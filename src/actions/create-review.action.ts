"use server";

import { revalidatePath, revalidateTag } from "next/cache";

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
    //* 리뷰 액션이 성공적으로 완료되면 그때 리뷰 목록을 서버측에서 다시 한번 페이지를 렌더링 해주자
    console.log(response.status);
    // revalidatePath(`/book/${bookId}`); // next서버측에 해당 경로에 해당하는 페이지를 다시 생성할 것을 요청하는 (재검증을 요청하는) 그런 함수(메서드)이다.
    revalidateTag(`review-${bookId}`); // 오직 이 태그값을 갖고있는 fetch메서드의 데이터 캐시만 삭제되어 위 방식보다 효율적임
  } catch (error) {
    console.log(error);
    return;
  }
};

//! 주의할점 : 1. revalidatePath()는 서버에서만 호출가능
//!        : 2. 해당 경로에 해당하는 페이지를 전부 재검증 시켜버리는 기능이기 때문에 이 페이지에 포함된 모든 캐시들 까지도 전부 무효화 시켜버리게됨
//!        :    즉, {cache: "force-cache"} 이런 데이터 캐싱 속성이 있어도 무효화 시킨다.
//!        :    revalidatePath가 호출이 되면 페이지를 재생성하는 과정에서 캐시도 삭제된다.
//!        :    또 데이터 캐시뿐만아니라 페이지를 캐싱하는 풀라우트 캐시까지 함께 삭제가 된다.
//!        :    풀 라우트 캐시를 삭제(무효화)하기만 할 뿐 다시 풀라우트 캐시에 저장하진 않는다. book/1번에 리뷰를 작성하면 기존에 풀라우트 캐시에 저장돼있었던, book/1 페이지는 지금 무효화된 즉, 삭제된 캐시라고 보면 된다. 다시 새로고침하면 이때는 캐시된 데이터를 사용할 수 없으니까 next서버측에서 실시간으로 다이나믹 페이지를 만들듯이 아예 새롭게 페이지를 다시 한번 생성해서 브라우저에게 보내주게됨. 그리고 나면 풀라우트 캐시를 업데이트 해줌.
//!        :    결론: revalidatePath를 서버액션에서 이용해 페이지를 재검증 하면 다음번에 페이지에 방문하게 되면 그때 실시간으로 다이나믹 페이지 처럼 생성이 되고 그때가 되서 풀 라우트 캐시에도 데이터가 업데이트 된다.

/** 다양한 재검증 방식 살펴보기
 *  1. 특정 주소의 해당하는 페이지만 재검증 -> revalidatePath(`/book/${bookId}`);
 *  2. 특정 경로의 모든 동적 페이지를 재검증 -> revalidatePath("/book/[id]", "page");  /book/[id] 를 갖는 페이지를 모두가 재검증 (모든 도서 페이지 재검증)
 *  3. 특정 레이아웃을 갖는 모든 페이지 재검증 -> revalidatePath("/(with-searchbar", "page");
 *  4. 모든 데이터 재검증 -> revalidatePath("/", "layout");  모든 페이지들이 한꺼번에 재검증
 *  5. 태그 기준, 테이터 캐시를 재검증 -> revalidateTag("tag"); 오직 이 태그값을 갖고있는 fetch메서드의 데이터 캐시만 삭제되어 1번째 방식보다 효율적임.
 *
 *
 *
 *
 *
 *
 *
 *
 */
