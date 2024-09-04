import { ReactNode } from "react";
import Searchbar from "../../components/searchbar";

//* 라우트 그룹(Route Group) : 경로상에는 아무런 영향을 끼치지 않는 폴더 (소괄호로 감싸면 됨)
//* 각기다른 경로를 갖는 페이지 파일들을 하나의 폴더안에 묶어둘 수 있음
//* 좋은점: 경로상에는 영향을 미치지 않으면서 레이아웃만 동일하게 적용할 수 있다.
const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Searchbar />
      {children}
    </div>
  );
};

export default Layout;
