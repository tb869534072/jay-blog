"use client";

import React, { useContext } from 'react';
import styles from './singlePost.module.css';
import Pagination from "@/components/pagination/Pagination";
import Comments from "@/components/comments/Comments";
import { ThemeContext } from '@/context/ThemeContext';

const getData = async(slug) => {
  const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  
  return res.json();
};

const SinglePost = async({params}) => {
  const { theme } = useContext(ThemeContext);
  const { slug } = params;
  const data = await getData(slug);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{data?.title}</h1>
          <div className={styles.user}>
            <div className={styles.userIconContainer}>
            </div>
            <div className={styles.userTextContainer}>
              <span className={styles.username}>{data?.username}</span>
              <span className={styles.date}>{data?.createdAt}</span>
            </div>
          </div>
        </div>
        <div className={styles.imageContainer}>
          {data.img ? (
            <Image src={data.img} alt="" fill className={styles.image} />
          ): ((theme === "light") ? (
            <Image src="/daytime.jpg" alt="" fill className={styles.image} />
          ): (
            <Image src="/night.jpg" alt="" fill className={styles.image} />
          )
          )}
        </div>
      </div>
      <div className={styles.content} dangerouslySetInnerHTML={{_html:data?.description}}/>
      <Pagination/>
      <Comments/>
    </div>
  )
}

export default SinglePost