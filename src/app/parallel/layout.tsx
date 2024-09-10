import Link from "next/link";

const Layout = ({
  children,
  sidebar,
  feed,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  feed: React.ReactNode;
}) => {
  return (
    <div>
      {/* //* 셋팅으로 이동하면 셋팅 레이아웃만 바뀌는걸 볼 수 있다.  */}
      <div>
        <Link href="/parallel">페럴렐 링크</Link>
        &nbsp;
        <Link href="/parallel/setting">페럴렐 / 셋팅 링크</Link>
      </div>
      <br />
      {sidebar}
      {children}
      {feed}
    </div>
  );
};

export default Layout;
