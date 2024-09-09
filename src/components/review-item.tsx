import { ReviewData } from "@/types";
import style from "./review-item.module.css";

export const ReviewItem = ({ id, author, content, createdAt }: ReviewData) => {
  return (
    <div className={style.container}>
      <div className={style.author}>{author}</div>
      <div className={style.content}>{content}</div>
      <div className={style.bottom_container}>
        <div className={style.date}>
          {new Date(createdAt).toLocaleDateString()}
        </div>
        <div className={style.delete_btn}>삭제하기</div>
      </div>
    </div>
  );
};

export default ReviewItem;
