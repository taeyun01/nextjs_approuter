"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import style from "./serachbar.module.css";

//? useSearchParams()는 비동기로 동작하는 훅이다.
//? 그리고 이 비동기 작업은 브라우저에서 useSearchParams()가 쿼리스트링을 실제로 불러왔을 때 종료된다.
//? 그래서 빌드시 사전렌더링 과정에서는 쿼리스트링을 불러오지 못하고 빈 값을 반환하게 된다.
//* 쿼리스트링을 불러왔을 때, 그때서야 종료되는 이런 비동기 함수를 사용하고 있기 때문에 해당 컴포넌트를 Suspense로 감싸주면 서버측 사전렌더링에선 완전히 제외되고, 클라이언트 측에서 쿼리스트링을 불러왔을 때에만 렌더링이 이루어지게 된다.
export default function Searchbar() {
  const router = useRouter();
  const searchParams = useSearchParams(); //* 앱라우터에서는 useSearchParams() 훅을 써야 쿼리스트링을 꺼낼 수 있음
  const [search, setSearch] = useState("");

  const q = searchParams.get("q");

  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className={style.container}>
      <input value={search} onChange={onChangeSearch} onKeyDown={onKeyDown} />
      <button onClick={onSubmit}>검색</button>
    </div>
  );
}
