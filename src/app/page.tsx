"use client";

import styles from "./homepage.module.css";
import Header from "@/components/header/Header";
import CardList from "@/components/cardList/CardList";
import { useSearchParams } from "next/navigation";

export default function Home() {

  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header/>
        <CardList page={page}/>
      </div>
    </div>
  );
}
