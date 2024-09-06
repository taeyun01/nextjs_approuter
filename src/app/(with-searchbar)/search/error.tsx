"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

//* 에러 핸들링
//* search 페이지만의 에러 핸들링이 필요하면 해당 폴더에 error.tsx 파일을 생성하면 된다.
const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  const router = useRouter();

  useEffect(() => {
    console.error(error.message);
  }, [error]);

  return (
    <div>
      <h3>검색과정에서 오류가 발생했습니다.</h3>
      <button
        onClick={() => {
          startTransition(() => {
            router.refresh();
            reset();
          });
        }}
      >
        다시 시도
      </button>
    </div>
  );
};

export default Error;
