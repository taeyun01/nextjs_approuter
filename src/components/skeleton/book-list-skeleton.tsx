import BookItemSkeleton from "./book-item-skeleton";

//* 도서 갯수 만큼 스켈레톤 설정
const BookListSkeleton = ({ count }: { count: number }) => {
  return new Array(count).fill(0).map((_, i) => <BookItemSkeleton key={i} />);
};

export default BookListSkeleton;
