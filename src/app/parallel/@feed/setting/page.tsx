//* 이렇게 @슬롯 안에 새로운 페이지도 추가 가능하다
//* 이 setting 페이지가 별도의 페이지로 따로 렌더링 되는 것은 아니라
//* layout컴포넌트에 함께 포함이 되어서 @feed슬롯 안에서 페이지가 렌더링 된다.

//? 해당 페이지를 새로고침 시 404페이지가 뜨는데, 이때에는 default.tsx파일을 생성.
//? 이렇게 특정 @슬롯(@feed) 밑에(setting) 페이지를 추가하는 경우
//? 404페이지로 보내지는 문제를 방지하기 위해 @sidebar슬롯이나 parallel폴더의 page컴포넌트 위치에 default페이지를 생성하는게 좋다.
const Page = () => {
  return (
    <div>
      <h1>@feed/setting</h1>
    </div>
  );
};

export default Page;
