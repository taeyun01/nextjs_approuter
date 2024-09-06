import { delay } from "@/util/delay";

//! search폴더에 loading 스트링을 걸어놔서 search/setting페이지도 딜레이가 걸리면 스트리밍이 된다. UI도 search폴더 있는 로딩 컴포넌트가 실행이 된다.
//! async가 붙은 비동기 페이지 컴포넌트 들만 스트리밍된다. 왜?? 그렇지 않으면 데이터를 불러오고 있지 않다는 뜻이니까.
//! async없는 페이지는 스트리밍 되지 않고 바로 렌더링됨
const Page = async () => {
  await delay(2000);
  return <div>설정 페이지 (스트리밍 테스트)</div>;
};

export default Page;
