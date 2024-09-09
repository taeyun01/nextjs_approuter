import style from "./review-editor.module.css";
import { createReviewAction } from "@/actions/create-review.action";

const ReviewEditor = ({ bookId }: { bookId: string }) => {
  return (
    <section>
      <form className={style.form_container} action={createReviewAction}>
        {/* bookId를 전달하고 싶을 때 사용할 수 있는 트릭 hidden추가 */}
        <input name="bookId" defaultValue={bookId} type="text" hidden />
        <textarea name="content" placeholder="리뷰내용" required />
        <div className={style.submit_container}>
          <input name="author" placeholder="작성자" type="text" required />
          <button type="submit">작성하기</button>
        </div>
      </form>
    </section>
  );
};
export default ReviewEditor;
