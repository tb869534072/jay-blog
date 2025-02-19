import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './card.module.css';

const Card = ({item}) => {
  return (
    <div className={styles.container}>
      <Link href="/">
        <div className={styles.imgContainer}>
        </div>
        <div className={styles.textContainer}>
          <span className={styles.date}>01.30.2025</span>
          <h1>{item.title}</h1>
          <p className={styles.description}>description</p>     
        </div>
      </Link>
    </div>
  )
}

export default Card