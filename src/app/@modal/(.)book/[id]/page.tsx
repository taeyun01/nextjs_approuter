import BookPage from "@/app/book/[id]/page";
import Modal from "@/components/modal";

//? 인터셉팅은 클라이언트 사이드 렌더링 방식으로 페이지가 이동할 때에만 작동한다.
//? 페이지를 새로고침해서 초기접속 요청을 날리게 되면 인터셉팅 라우트가 풀린다.
const Page = (props: any) => {
  return (
    //* 뒷배경에 원래 탐색하고 있던 index페이지를 띄어보자 (더 완성도 있게)
    //* 이 모달이 띄어진 이전의 페이지가 렌더링 되게 (index페이지나 search페이지가 병렬로 함께 렌더링 되게끔)
    //* 이때! 병렬로 페이지를 렌더링 시키는 기능인 페럴렐 라우트를 이용한다! (페럴렐 라우트 -> @슬롯)
    <Modal>
      <BookPage {...props} />
    </Modal>
  );
};

export default Page;

//* 이렇게 인터셉팅 라우트와 페럴렐 라우트를 함꼐 결합해서 사용하므로써
//* 특정 아이템의 상세 페이지의 모달로써 띄워주는 것도 굉장히 좋은 사용자 경험을 제공할 수 있다.
