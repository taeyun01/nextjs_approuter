"use client";
import { useState } from "react";

//* 브라우저에서 하이드레이션 되도록 use client 선언
//* 입력이나 클릭같은 상호작용이 있으면 그런 컴포넌트들만 떼서 클라이언트 컴포넌트로 만들어주기
const Searchbar = () => {
  const [search, setSearch] = useState("");

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <input type="text" value={search} onChange={onChangeSearch} />
      <button>검색</button>
    </div>
  );
};

export default Searchbar;
