//* 쿼리스트링을 꺼내 쓸때는 페이지컴포넌트의 props로 꺼내쓰면 된다.

import ClientComponent from "@/components/client-component";

//* AppRouter에서 쿼리스트링이나 URL파라미터처럼 경로와 함께 명시되는 값들은 페이지 컴포넌트의 props로 다 전달이 된다.
const Page = ({ searchParams }: { searchParams: { q?: string } }) => {
  return (
    <div>
      검색 페이지 {searchParams.q}
      <ClientComponent>
        <></>
      </ClientComponent>
    </div>
  );
};

export default Page;
