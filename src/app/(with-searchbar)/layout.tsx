import { ReactNode, Suspense } from "react";
import Searchbar from "../../components/searchbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      {/* //* 풀 라우트 캐시를 하고있어 검색을 해도 시간이 흐르지 않는다. (새로고침 해야 바뀜) */}
      {/* <div>{new Date().toLocaleString()}</div> */}
      {/* //* 빌드시 사전렌더링 과정에서는 배제되고 오직 클라이언트에서만 렌더링이 되도록 설정이 된다.  */}
      {/* <Suspense fallback={<div>Loading...</div>}> */}
      <Suspense fallback={null}>
        <Searchbar />
      </Suspense>
      {children}
    </div>
  );
}
