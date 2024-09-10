"use client";
import style from "@/components/modal.module.css";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

const Modal = ({ children }: { children: React.ReactNode }) => {
  //? dialog라는 HTML 태그는 모달의 역할을 하기 때문에 기본적으론 꺼져있는 상태로 렌더링 된다. (처음 렌더링 시에는 안보인다)
  //? 1. 래퍼런스 객체를 만들고 dialog태그에 ref속성으로 연결 시켜준다.
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  const handleBack = (e: React.MouseEvent<HTMLDialogElement>) => {
    //? 모달의 배경이 클릭된거면 -> 뒤로가기
    if ((e.target as any).nodeName === "DIALOG") {
      router.back();
    }
  };

  //? 2. Modal컴포넌트가 마운트 됐을 때
  useEffect(() => {
    //? 3. 모달이 꺼져있는 상태라면
    if (!dialogRef.current?.open) {
      //? 4. 모달을 강제로 열어준다.
      dialogRef.current?.showModal();
      //? 5. 모달이 등장하자마자 스크롤을 최상단으로 위치하도록 올려준다.
      dialogRef.current?.scrollTo({
        top: 0,
      });
    }
  }, []);

  //* createPortal() 메서드를 통해 브라우저에 존재하는 "modal-root" 이러한 DOM요소 아래에 고정적으로 모달 요소들을 렌더링 하도록 설정한것이다.
  //* root layout에 <div id="modal-root"></div>를 추가해주면 Modal컴포넌트가 렌더링 하는 <dialog>태그는 해당 요소 아래에 모달 요소가 렌더링 된다
  //* 그럼 모달이 화면 전체를 뒤덮도록 설정한것이므로 HTML구조상 어색하지 않다.
  return createPortal(
    <dialog
      ref={dialogRef}
      className={style.modal}
      onClose={handleClose} //? esc누르면 모달이 꺼지는 이벤트
      onClick={handleBack}
    >
      {children}
    </dialog>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default Modal;
