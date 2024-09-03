import styles from "./page.module.css";

export default function Home() {
  console.log("인덱스 페이지");
  return <div className={styles.page}>인덱스 페이지</div>;
}
