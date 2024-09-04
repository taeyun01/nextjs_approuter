"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

//* 브라우저에서 하이드레이션 되도록 use client 선언
//* 입력이나 클릭같은 상호작용이 있으면 그런 컴포넌트들만 떼서 클라이언트 컴포넌트로 만들어주기
//? 중요한점은 앱라우터에서 페이지의 데이터가 서버 컴포넌트는 RSC페이로드로 클라이언트 컴포넌트는 자바스크립트 번들로 나뒤어서 동시에 전달이 된다.
const Searchbar = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    router.push(`/search?q=${search}`);
  };

  return (
    <div>
      <input type="text" value={search} onChange={onChangeSearch} />
      <button onClick={onSubmit}>검색</button>
    </div>
  );
};

export default Searchbar;
