"use client";

import React, { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './card.module.css';
import { ThemeContext } from '@/context/ThemeContext';

const Card = ({item}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Link href={`/posts/${item.slug}`} className={styles.container}>
      <div className={styles.imgContainer}>
        {item.img ? (
          <Image 
          src={item.img}
          alt="" 
          fill 
          className={styles.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px" 
          priority
        />
        ): ((theme === "light") ? (
          <Image 
            src="/daytime.jpg"
            alt="" 
            fill 
            className={styles.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px" 
            priority
          />
        ): (
          <Image 
            src="/night.jpg"
            alt="" 
            fill 
            className={styles.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px" 
            priority
          />
        )
        )}
      </div>
      <div className={styles.textContainer}>
        <span className={styles.date}>{item.createdAt.slice(0, 10)}</span>
        <h1>{item.title}</h1>
        <p className={styles.description}>{item.description.slice(0, 60)}</p>     
      </div>
    </Link>
  )
}

export default Card