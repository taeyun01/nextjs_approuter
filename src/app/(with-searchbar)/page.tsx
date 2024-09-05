import BookItem from "@/components/book-item";
import style from "./page.module.css";
import books from "@/mock/books.json";
import { BookData } from "@/types";

//* # 데이터 캐시
//* fetch 메서드를 활용해 불러온 데이터를 Next서버에 보관하는 기능
//* await fetch(”~/api”,{cache: “no-store”}) 요청 결과를 캐싱하지 않음 (기본값)
//* await fetch(”~/api”, {cache: “force-cache”}) 요청 결과를 무조건 캐싱
//* await fetch(”~/api”, {next: {revalidate: 3}}) 3초 마다 재검증(갱신)
//* await  fetch(”~/api”, {next: {tags: [’a’]}) 요청이 들어왔을 때 데이터를 최신화(On-Demand Revalidate)
const AllBooks = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    {
      // cache: "no-store", // 요청 결과를 캐싱 하지않음. 안써도됨 기본값임
      cache: "force-cache",
    }
  );
  // 예외처리
  if (!response.ok) return <div>오류가 발생했습니다...</div>;

  const allBooks: BookData[] = await response.json();
  // console.log(allBooks);

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
      // cache: "force-cache", // 요청된 결과 무조건 캐싱, (이제 랜덤하게 불러오지 않음)
      next: {
        revalidate: 3, // 3초 마다 재검증(갱신), revalidate는 페이지를 다이나믹하게 설정하는 옵션은 아니기 떄문에 놔둔다.
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
