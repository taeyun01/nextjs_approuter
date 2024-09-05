import { notFound } from "next/navigation";
import style from "./page.module.css";
import { BookData } from "@/types";

//? dynamicParams를 false로 설정하면 아래 설정한 generateStaticParams()에 명시하지 않는 id파라미터들은 다 404페이지로 리다이렉트 된다.
// export const dynamicParams = false; // 기본값은 true

//* bool/1, bool/2, bool/3 페이지들은 스태틱 페이지로써 빌드타임에 만들게 된다. (페이지 라우터의 getStaticPaths()와 같은 역할을 한다.)
//* 1, 2, 3번의 id도서는 풀 라우터 캐시에 보관이 되어 굉장히 빠른 속도로 스태틱 페이지가 반환됨
//! 주의할점
//! 1. id는 문자열로만
//! 2. generateStaticParams()를 내보내주게되면 페이지 컴포넌트 내부에 데이터 캐싱이 설정되지 않은 데이터 패칭이 존재하게 되면 무조건 해당하는 페이지가 스태틱 페이지로써 강제로 설정이 된다.
export const generateStaticParams = async () => {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
};

//* id의 url파라미터를 받는 동적경로에 대응하는 페이지는 다이나믹 페이지로 설정된다.
//* 어떠한 id의 파라미터가 들어올 지 모르기 때문에 기본값으론 다이나믹 페이지로 설정된다.
export default async function Page({
  params,
}: {
  params: { id: string | string[] };
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${params.id}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      notFound(); // 없는 페이지일 경우 자동으로 404페이지로 리다이렉트 됨
    }
    return <div>오류가 발생했습니다...</div>;
  }

  const book: BookData = await response.json();

  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
