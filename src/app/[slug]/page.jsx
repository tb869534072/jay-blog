import React from 'react';
import styles from './singlePost.module.css';
import Pagination from "@/components/pagination/Pagination";
import Comments from "@/components/comments/Comments";

const SinglePost = () => {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>Lorem ipsum</h1>
          <div className={styles.user}>
            <div className={styles.userIconContainer}>
            </div>
            <div className={styles.userTextContainer}>
              <span className={styles.username}>Jay Liu</span>
              <span className={styles.date}>02/04/2025</span>
            </div>
          </div>
        </div>
        <div className={styles.imageContainer}>
        </div>
      </div>
      <div className={styles.content}>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, iusto libero? Praesentium porro autem, laudantium impedit, facere nostrum enim facilis quam quas adipisci maiores vel, fugit alias. Laboriosam, odio non.</p>
        <h2>lorem</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque incidunt necessitatibus enim praesentium cumque corporis autem velit, hic eveniet ratione, consequatur nobis esse, dicta dolores laboriosam possimus distinctio officia voluptatum.</p>
      </div>
      <Pagination/>
      <Comments/>
    </div>
  )
}

export default SinglePost