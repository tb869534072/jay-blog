import React from 'react'
import styles from './cardList.module.css'
import Card from "@/components/card/Card";
import Pagination from "@/components/pagination/Pagination";

const CardList = () => {
  return (
    <div className={styles.container}>
      <div className={styles.posts}>
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <Pagination/>
    </div>
  )
}

export default CardList