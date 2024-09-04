"use client";

import { ReactNode } from "react";
import ServerComponent from "../app/(with-searchbar)/server-component";
//* 클라이언트 컴포넌트에서 서버컴포넌트를 렌더링하면 Next가 알아서 서버컴포넌트는 클라이언트 컴포넌트로 변환된다.
//* 클라이언트 컴포넌트에서 서버컴포넌트를 자식 컴포넌트로 렌더링하는 것은 최대한 피하는 것이 좋다.
//? 하지만 어쩔수 없이 써야된다면?? 한가지 방법은 children을 사용해 내려주는것. ServerComponent를 직접 임포트해서 사용하지 말고 children으로 서버컴포넌트를 넘겨주는 구조로 변경
//? Next에서 children으로 넘겨주는 서버컴포넌트는 클라이언트 컴포넌트로 번경하지 않는다!!
const ClientComponent = ({ children }: { children: ReactNode }) => {
  console.log("클라이언트 컴포넌트!");
  return (
    <div>
      {/* <ServerComponent />; */}
      {children}
    </div>
  );
};

export default ClientComponent;

//* 1. `서버 컴포넌트` 에서는 브라우저에서 실행될 코드가 포함되면 안된다.
//* 2. `클라이언트 컴포넌트` 는 클라이언트에서만 실행되지 않는다.
//* 3. `클라이언트 컴포넌트` 에서는 `서버 컴포넌트`를 import 할 수 없다.
//* 4. `서버 컴포넌트` 에서 `클라이언트 컴포넌트` 에게 직렬화 되지 않는 Props는 전달 불가하다.
