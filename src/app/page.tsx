import Image from "next/image";
import Link from "next/link";
import styles from "./homepage.module.css";
import CardList from "@/components/cardList/CardList";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <CardList/>
      </div>
    </div>
  );
}
