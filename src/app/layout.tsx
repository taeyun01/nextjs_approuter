import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import { BookData } from "@/types";

//* 동일한 페이지에서 중복된 api의 요청들을 하나의 요청으로 자동으로 합쳐주는 기능 (기본값)
//* 데이터캐시와는 다르기 때문에 페이지의 렌더링이 종료되면 자동으로 캐시된 데이터들이 소멸된다.
const Footer = async () => {
  //* 전체 도서를 가져오는 api요청은 지금 Loot페이지에도 요청을 중복적으로 하고있다.
  //* 하지만 Request Memoization이 자동으로 하나로 합쳐져서 한번만 실행되게 해준다.
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    {
      cache: "force-cache", //? 도서를 추가하거나 수정하는 작업은 없으니까 강제로 캐싱되도록 설정해도 기능상 문제는 없다.
    }
  );
  if (!response.ok) return <footer>제작 @taeyun yoo</footer>;
  const books: BookData[] = await response.json();
  const bookCount = books.length;
  return (
    <footer>
      <div>제작 @taeyun yoo</div>
      <div>{bookCount}개의 도서가 등록되어 있습니다.</div>
    </footer>
  );
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header>
            <Link href={"/"}>📚 개발자 도서 추천</Link>
          </header>
          <main>{children}</main>
          <Footer />
        </div>
        {modal}
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
