import BookItem from "@/components/book-item";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";

const SearchResult = async ({ q }: { q: string }) => {
  await delay(2000);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
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
};

//* 검색 페이지는 searchParams라는 쿼리스트링을 보관하는 이러한 Props를 받고 있다. 동적함수를 사용하고 있기때문에 다이나믹 페이지로 설정돼있다.
//* 스태틱 페이지로 설정하려면 동적함수를 사용하지 못하도록 해야하는데 그러면 쿼리스트링을 사용하지 못하니 그렇게 할 수는 없다.
//* 이렇게 검색페이지 처럼 실시간으로 사용자의 검색어를 기반으로 어떠한 데이터를 백엔드 서버에서 부터 불러와 렌더링해줘야 하는 페이지는 스태틱으로 설정할 수 없다.
//* 그래도 조금이라도 설정하고 싶다면, 데이터 캐시를 활용하여 설정하면 된다.
export default function Page({
  searchParams,
}: {
  searchParams: {
    q?: string;
  };
}) {
  return (
    // fallback = 대체재, 보완책 (대체 UI로 로딩을 보여줌)
    // key값이 변경되면 서스펜스 스트리밍이 시작된다.(검색어가 변경되면 시작.)
    <Suspense
      key={searchParams.q || ""}
      fallback={<div>서스펜스 스트리밍 로딩중...</div>}
    >
      <SearchResult q={searchParams.q || ""} />
    </Suspense>
    //? 이렇게 되는 원리는 무엇일까??
    //? 리액트의 Suspense라는 컴포넌트는 최초로 한번 내부 컴포넌트(SearchResult)의 로딩이 완료 된 이후에는 더이상 로딩을 보여주지 않는다.
    //? 그렇기 때문에 한번 로딩 상태를 마치게 되면 더 이상 로딩 상태를 표시할 수 없다.
    //? 이럴때에는 Suspense의 key값을 변경해서 쿼리스트링이 바뀔때마다 리액트에게 새로운 컴포넌트로 인식하도록 설정을 해준다.
    //* 중요: 리액트에서는 key값이 변경되면 컴포넌트가 완전히 달라졌다 또는 다른 컴포넌트가 생겼다 라고 인식을 하게되므로 key값을 활용해 트릭처럼 로딩 상태를 다시 표시하게 할 수 있다.
  );
}
