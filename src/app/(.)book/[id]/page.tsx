import BookPage from "@/app/book/[id]/page";
import Modal from "@/components/modal";

//? 인터셉팅은 클라이언트 사이드 렌더링 방식으로 페이지가 이동할 때에만 작동한다.
//? 페이지를 새로고침해서 초기접속 요청을 날리게 되면 인터셉팅 라우트가 풀린다.
const Page = (props: any) => {
  return (
    <div>
      가로채기 성공!
      <Modal>
        <BookPage {...props} />
      </Modal>
    </div>
  );
};

export default Page;
