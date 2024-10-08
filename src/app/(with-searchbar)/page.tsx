import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";
import { Metadata } from "next";

const AllBooks = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    {
      cache: "force-cache", // 요청 결과를 무조건 캐싱
    }
  );

  if (!response.ok) return <div>오류가 발생했습니다...</div>;

  const allBooks: BookData[] = await response.json();

  return (
    <div>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
};

const RecoBooks = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    {
      next: {
        revalidate: 3,
      },
    }
  );
  if (!response.ok) return <div>오류가 발생했습니다...</div>;

  const recoBooks: BookData[] = await response.json();

  return (
    <div>
      {recoBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
};

//* 마지막 최적화 > dynamic 제거 (이제 스택틱 페이지로 전환되어 조금 더 빠르게 페이지가 제공됨) dynamic이 아니면 서스펜스 컴포넌트는 작동안하므로 제거
// export const dynamic = "force-dynamic"; // 해당 index페이지는 강제로 다이나믹 페이지로 변경됨

export const metadata: Metadata = {
  title: "개발자 도서 추천",
  description: "개발자 도서 추천에 등록된 도서를 만나보세요!",
  openGraph: {
    title: "개발자 도서 추천",
    description: "개발자 도서 추천에 등록된 도서를 만나보세요!",
    images: ["/thumbnail.png"],
  },
};

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <RecoBooks />
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <AllBooks />
      </section>
    </div>
  );
}

//? 최적화 전
// import BookItem from "@/components/book-item";
// import style from "./page.module.css";
// import { BookData } from "@/types";
// import { delay } from "@/util/delay";
// import { Suspense } from "react";
// import BookListSkeleton from "@/components/\bskeleton/book-list-skeleton";
// import { Metadata } from "next";

// //* 특정 페이지의 유형을 강제로 Static , Dynamic 페이지로 설정
// //* 1. auto : 기본값, 아무것도 강제하지 않음
// //* 2. force-dynamic : 페이지를 강제로 다이나믹 페이지로 설정
// //* 3. force-static : 페이지를 강제로 스태틱 페이지로 설정
// //* 4. error : 페이지를 강제로 스태틱 페이지로 설정 (설정하면 안되는 페이지일 경우 -> 빌드오류(왜 안되는지 이유 써있음))
// // export const dynamic = "auto"; //? 정말 필요하거나 특별한 상황 아니면 권장되지 않음.

// //* 데이터 캐시
// //* fetch 메서드를 활용해 불러온 데이터를 Next서버에 보관하는 기능
// const AllBooks = async () => {
//   await delay(1500);
//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
//     {
//       // cache: "no-store", // 요청 결과를 캐싱하지 않음. (기본값)
//       cache: "force-cache", // 요청 결과를 무조건 캐싱
//       // next: { revalidate: 3 }, // 3초 마다 재검증(갱신)
//       // next: { tags: ["a"] }, // 요청이 들어왔을 때 데이터를 최신화(On-Demand Revalidate)
//     }
//   );
//   // 예외처리
//   if (!response.ok) return <div>오류가 발생했습니다...</div>;

//   const allBooks: BookData[] = await response.json();
//   // console.log(allBooks);

//   return (
//     <div>
//       {allBooks.map((book) => (
//         <BookItem key={book.id} {...book} />
//       ))}
//     </div>
//   );
// };

// const RecoBooks = async () => {
//   await delay(3000);
//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
//     {
//       // cache: "force-cache", // 요청된 결과 무조건 캐싱, (이제 랜덤하게 불러오지 않음)
//       next: {
//         revalidate: 3, // 3초 마다 재검증(갱신), revalidate는 페이지를 다이나믹하게 설정하는 옵션은 아니기 떄문에 놔둔다.
//       },
//     }
//   );
//   if (!response.ok) return <div>오류가 발생했습니다...</div>;

//   const recoBooks: BookData[] = await response.json();

//   return (
//     <div>
//       {recoBooks.map((book) => (
//         <BookItem key={book.id} {...book} />
//       ))}
//     </div>
//   );
// };

// //? 서스펜스 스트리밍의 진가를 알아보자!
// //? 우선 스트리밍을 적용시키기 위해서는 다이나믹 페이지로 바꿔줘야한다.
// export const dynamic = "force-dynamic"; // 해당 index페이지는 강제로 다이나믹 페이지로 변경됨

// //* 메타데이터 설정
// //* 동적인 데이터가 필요하지 않은 경우에는 const metadata를 export로 내보내어 사용 (정해진 규칙)
// export const metadata: Metadata = {
//   title: "개발자 도서 추천",
//   description: "개발자 도서 추천에 등록된 도서를 만나보세요!",
//   //? openGraph는 카톡 같은데 공유 시 보여지는 미리보기 이미지, 제목, 설명 등을 설정할 수 있다.
//   openGraph: {
//     title: "개발자 도서 추천",
//     description: "개발자 도서 추천에 등록된 도서를 만나보세요!",
//     images: ["/thumbnail.png"],
//   },
// };

// export default function Home() {
//   return (
//     <div className={style.container}>
//       <section>
//         <h3>지금 추천하는 도서</h3>
//         {/* //? 이렇게 서스펜스 컴포넌트를 활용하면 병렬로 하나의 페이지 내에서 여러개의 컴포넌트들을 완료되는 순서대로 화면에 각각 렌더링 시킬 수 있다
//             //? loding.tsx파일을 이용하기 보다는 대부분 서스펜스 컴포넌트를 사용하는게 선호가 되고 많은곳에 범용적으로 활용할 수 있다.
//         */}
//         <Suspense fallback={<BookListSkeleton count={3} />}>
//           <RecoBooks />
//         </Suspense>
//       </section>
//       <section>
//         <h3>등록된 모든 도서</h3>
//         <Suspense fallback={<BookListSkeleton count={10} />}>
//           <AllBooks />
//         </Suspense>
//       </section>
//     </div>
//   );
// }
