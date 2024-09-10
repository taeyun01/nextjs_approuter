import { notFound } from "next/navigation";
import style from "./page.module.css";
import { BookData, ReviewData } from "@/types";
import ReviewItem from "@/components/review-item";
import ReviewEditor from "@/components/review-editor";
import Image from "next/image";

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

const BookDetail = async ({ bookId }: { bookId: string }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`
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
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        {/* <img src={coverImgUrl} /> */}
        <Image
          src={coverImgUrl}
          width={240}
          height={300}
          alt={`도서 ${title}의 이미지`}
        />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );
};

//* 서버액션 왜 씀??
//*  우선 코드가 매우 간결함, API를 이용해 이런 기능을 만드려면 별로의 파일을 추가하고 경로를 설정하고 예외처리를 해줘야하는 부가적인 작업들이 매번하기에는 귀찮다.
//* 단순한 기능만 할 경우에는 서버액션을 써서 보다 간결하게 함수 하나만으로도 API역할을 충실히 할 수 있다.
//* 그리고 오직 서버측에서만 실행되기 때문에 클라이언트인 브라우저에서는 호출만 할 수 있을 뿐 이 코드를 전달 받지는 않는다.
//* 보안상으로 민감하거나 중요한 데이터를 다룰때 유용하게 활용될 수 있다.
//? 즉, 서버액션의 목적은 조금 더 간결하고 조금 더 편리하게 서버측에서 실행되는 동작을 정의하는 데에 있다.

const ReviewList = async ({ bookId }: { bookId: string }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`,
    {
      next: {
        tags: [`review-${bookId}`],
      },
    }
  );

  // api요청 실패 시 오류메세지와 함께 error.tsx파일이 에러를 처리해주게됨
  if (!response.ok) {
    throw new Error(
      `리뷰를 불러오는데 오류가 발생했습니다. ${response.statusText}`
    );
  }

  const reviews: ReviewData[] = await response.json();

  return (
    <section>
      {reviews.map((review) => (
        <ReviewItem key={`review-item-${review.id}`} {...review} />
      ))}
    </section>
  );
};

//* id의 url파라미터를 받는 동적경로에 대응하는 페이지는 다이나믹 페이지로 설정된다.
//* 어떠한 id의 파라미터가 들어올 지 모르기 때문에 기본값으론 다이나믹 페이지로 설정된다.
export default async function Page({ params }: { params: { id: string } }) {
  return (
    <div className={style.container}>
      <BookDetail bookId={params.id} />
      <ReviewEditor bookId={params.id} />
      <ReviewList bookId={params.id} />
    </div>
  );
}
