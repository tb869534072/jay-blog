import Image from "next/image";
import Link from "next/link";
import styles from "./homepage.module.css";
import Header from "@/components/header/Header";
import CardList from "@/components/cardList/CardList";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header/>
        <CardList/>
      </div>
    </div>
  );
}
