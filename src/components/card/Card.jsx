"use client";

import React, { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './card.module.css';
import { ThemeContext } from '@/context/ThemeContext';
import useScrollFade from "@/lib/useScrollFade";

const Card = ({item}) => {
  const { theme } = useContext(ThemeContext);
  const { ref, isVisible } = useScrollFade();
  
  const getFirstSentence = (text) => {
    if (!text) return "";
    const match = text.match(/^(.*?)([.!?]<br>?|\n|<br>)/i);
    return match ? match[0].trim() : text;
  };

  return (
    <Link 
      href={`/posts/${item.slug}`} 
      className={`${styles.container} ${isVisible ? styles.visible : ""}`}
      ref={ref}
    >
      <div className={styles.imgContainer}>
        {item.img ? (
          <Image 
          src={item.img}
          alt="" 
          fill 
          className={styles.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px" 
          unoptimized={true}
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
      <div className={styles.infoContainer}>
        <div className={styles.date}>{item.createdAt.slice(0, 10)}</div>
        <div className={styles.textContainer}>
          <h1>{item.title}</h1>
          <p 
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: getFirstSentence(item.description)}}>
          </p>
        </div>
      </div>
    </Link>
  )
}

export default Card;