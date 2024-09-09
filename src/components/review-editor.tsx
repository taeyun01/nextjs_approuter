"use client";

import style from "./review-editor.module.css";
import { createReviewAction } from "@/actions/create-review.action";
import { useActionState, useEffect } from "react";

//? form태그를 사용할 경우에, 중복제출을 방지한다던지 에러핸들링을 해야한다던지
//? 이러한 요구사항들이 항상 따라다닐 수 밖에 없기 때문에 되도록이면
//? 클라이언트 컴포넌트로 만들어주고 useActionState()를 적극적으로 이용하는걸 권장
const ReviewEditor = ({ bookId }: { bookId: string }) => {
  //* isPending을 사용해 로딩상태를 표시하고, 중복으로 form제출을 방지
  const [state, formAction, isPending] = useActionState(
    createReviewAction,
    null
  );

  //* createReviewAction()의 서버 액션이 실패하면 에러핸들링 처리
  useEffect(() => {
    if (state && !state.status) alert(state.error);
  }, [state]);

  return (
    <section>
      <form className={style.form_container} action={formAction}>
        {/* bookId를 전달하고 싶을 때 사용할 수 있는 트릭 hidden추가 */}
        <input name="bookId" defaultValue={bookId} type="text" hidden />
        <textarea
          name="content"
          placeholder="리뷰내용"
          disabled={isPending}
          required
        />
        <div className={style.submit_container}>
          <input
            name="author"
            placeholder="작성자"
            type="text"
            disabled={isPending}
            required
          />
          <button type="submit" disabled={isPending}>
            {isPending ? "등록중..." : "작성하기"}
          </button>
        </div>
      </form>
    </section>
  );
};
export default ReviewEditor;
