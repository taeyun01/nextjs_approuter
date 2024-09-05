import BookItem from "@/components/book-item";
import { BookData } from "@/types";

//* 검색 페이지는 searchParams라는 쿼리스트링을 보관하는 이러한 Props를 받고 있다. 동적함수를 사용하고 있기때문에 다이나믹 페이지로 설정돼있다.
//* 스태틱 페이지로 설정하려면 동적함수를 사용하지 못하도록 해야하는데 그러면 쿼리스트링을 사용하지 못하니 그렇게 할 수는 없다.
//* 이렇게 검색페이지 처럼 실시간으로 사용자의 검색어를 기반으로 어떠한 데이터를 백엔드 서버에서 부터 불러와 렌더링해줘야 하는 페이지는 스태틱으로 설정할 수 없다.
//* 그래도 조금이라도 설정하고 싶다면, 데이터 캐시를 활용하여 설정하면 된다.
export default async function Page({
  searchParams,
}: {
  searchParams: {
    q?: string;
  };
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${searchParams.q}`,
    {
      cache: "force-cache", //* 이러면 한번 검색된 페이지는 조금더 빠르게 페이지를 응답해 줄 수 있다.
    }
  );

  if (!response.ok) return <div>오류가 발생했습니다...</div>;

  const books: BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}
