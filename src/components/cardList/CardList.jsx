import React from 'react'
import styles from './cardList.module.css'
import Card from "@/components/card/Card";
import Pagination from "@/components/pagination/Pagination";

async function getData(page) {
  const res = await fetch(`http://localhost:3000/api/posts?page=${page}`);

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  
  return res.json();
};

export default async function CardList({ page }) {

  const data = await getData(page);

  return (
    <div className={styles.container}>
      <div className={styles.posts}>
        {data?.map((item) => (
          <Card item={item} key={item._id}/>
        ))}
      </div>
      <Pagination/>
    </div>
  )
}