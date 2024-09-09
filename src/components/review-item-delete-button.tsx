"use client";

import { deleteReviewAction } from "@/actions/delete-review.action";
import { useActionState, useEffect, useRef } from "react";

//* 서버 액션을 이용한 리뷰 삭제하기
//* 새로운 데이터를 추가하거나 삭제하거나 변경된 데이터를 페이지에 업데이트 하는 여러가지 방법을 사용해보았다!
//* 이렇게 데이터를 수정해야 할 일이 있으면 서버 액션을 이용해서 다양한 기능을 만들자!
const ReviewItemDeleteButton = ({
  reviewId,
  bookId,
}: {
  reviewId: number;
  bookId: number;
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    deleteReviewAction,
    null
  );

  useEffect(() => {
    //* 에러 핸들링 설정
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction}>
      <input type="hidden" name="reviewId" defaultValue={reviewId} />
      <input type="hidden" name="bookId" defaultValue={bookId} />
      {isPending ? (
        <div>삭제중...</div>
      ) : (
        //* requestSubmit()를 쓰는 이유는 실제로 사용자가 submit버튼을 클릭한 것과 똑같이 동작을 하기 때문에 비교적 의도한 대로 안전하게 동작할 가능성이 높다.
        //* 리액트에서는 submit()메서드 보다는 requestSubmit()을 사용하는 것을 권장
        //* 가끔은 이렇게 버튼이 아닌 div태그나 또는 a태그 요소들을 통해서 폼을 제출해야되는 상황이 발생할 수 있다.
        //* 디자이너의 요구사항이나 기획자의 요구사항을 반영하기 위해서 그런 경우가 발생할 수 있으니 이럴때는 useRef객체를 활용하자
        <div onClick={() => formRef.current?.requestSubmit()}>삭제하기</div>
      )}
    </form>
  );
};

export default ReviewItemDeleteButton;
