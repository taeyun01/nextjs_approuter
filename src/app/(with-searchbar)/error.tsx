"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

//* 에러 핸들링
//* error.tsx 파일에 같은 경로에 있거나 또는 하위 경로에 있는 페이지에서 오류가 발생하게 되면 error.tsx파일이 실행된다.
//* 에러 컴포넌트에게 자동으로 전달되는 props인 error라는 값을 통해 메세지를 출력할 수 있다.
//* error말고 reset이라는 props도 제공되는데 reset은 에러가 발생한 페이지를 복구하기 위해 다시한번 컴포넌트들을 렌더링 시켜보는 기능을 가지고 있는 함수이다.
//! 하지만 서버를 끄고나서 키고 다시시도를 눌렀을때 오류가 발생한다. 왜 그럴까??
//! reset()함수는 그냥 브라우저 측에서만 클라이언트 측에서만 화면을 다시한번 렌더링만 해준다.
//! 구체적으로 서버측에서 실행된 서버 컴포넌트를 다시 실행하진 않는다.
//! 클라이언트 컴포넌트 내부에서 발생하는 오류만 복구할 수 있다.
//? window.location.reload()를 통해 할 순 있지만, 오류가 난 부분만 렌더링을 시키고 싶다면
const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  const router = useRouter();

  useEffect(() => {
    console.error(error.message);
  }, [error]);

  return (
    <div>
      <h3>오류가 발생했습니다.</h3>
      {/* //* 다시 시도 버튼을 누르면 reset 함수가 실행되면서 페이지를 다시 렌더링 시킨다. */}
      <button onClick={() => reset()}>다시 시도</button>
      <button
        onClick={() => {
          /** 함수 하나를 인수로 받아서, 해당 함수 내부의 코드를 동기적으로 실행함 */
          startTransition(() => {
            router.refresh(); //? 현재 페이지에 필요한 서버컴포넌트 들을 다시 불러옴 (AllBooks, RecoBooks 컴포넌트들을 다시 렌더링을 진행하게 된다. 이때 fetch()메서드도 다시 호출되게 된다.)
            reset(); //? 그럼 이건 왜 다시 호출함?? >> reset()함수는 에러상태를 초기화하고 컴포넌트들을 다시 렌더링 하기 때문이다.
          });
          //? router.refresh() 통해 서버컴포넌트들을 다시 불러와서 렌더링 한다 해도 클라이언트 컴포넌트인 Error컴포넌트가 사라지진 않는다.
          //? 더 쉽게 말하자면 에러 상태가 초기화 되진 않는다. 그래서 reset()을 호출해줘야 서버컴포넌트의 결과값도 다시 계산하고, 에러상태도 다시 초기화하는 동작이 연쇄적으로 일어나게 되서 결과적으로 페이지를 복구 시킬 수 있다.
          //! 하지만 router.refresh();랑 reset()을 호출해도 에러가 난다. 왜 그럴까??  router.refresh()는 비동기적으로 실행되서 그렇다. 그래서 router.refresh()가 전부 실행되기 전에 reset()함수가 실행되어 오류가 나는 것이다.
          //! 이때 리액트18버전에 나온 startTransition() 를 사용하여 router.refresh()와 reset()함수가 마치 한몸처럼 움직이게 되어 이제 오류없이 정상적으로 실행된다.
        }}
      >
        다시 시도
      </button>
    </div>
  );
};

export default Error;
