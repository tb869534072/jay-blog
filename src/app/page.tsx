import styles from "./homepage.module.css";
import Header from "@/components/header/Header";
import CardList from "@/components/cardList/CardList";

export default function Home({searchParams}) {
  const page = parseInt(searchParams.page) || 1;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header/>
        <CardList page={page}/>
      </div>
    </div>
  );
}
