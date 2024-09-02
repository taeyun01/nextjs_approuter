//* 상세페이지 book/1, book/2 ... id값을 받으려면 params.id로 받으면 됨
const Page = ({ params }: { params: { id: string | string[] } }) => {
  return <div>책 상세 페이지 [id] : {params.id}</div>;
};

export default Page;
