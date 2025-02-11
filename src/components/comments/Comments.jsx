import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './comments.module.css'

const Comments = () => {
  const status = "authenticated";
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comments</h1>
      {status === "authenticated" ? (
        <div className={styles.write}>
          <textarea placeholder="Write a comment..." className={styles.input}/>
          <button className={styles.button}>Send</button>
        </div>
        ) : (
          <Link href="/login">Login to write a comment</Link>
        )
      }
      <div className={styles.comments}>
        <div className={styles.comment}>
          <div className={styles.user}>
            {/* <Image src="" alt="" width={50} height={50} className={styles.image}/> */}
            <div className={styles.userInfo}>
              <span className={styles.username}>Jay Liu</span>
              <span className={styles.date}>02/04/2025</span>
            </div>
          </div>
          <div className={styles.content}>
           <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, iusto libero? Praesentium porro autem, laudantium impedit, facere nostrum enim facilis quam quas adipisci maiores vel, fugit alias. Laboriosam, odio non.</p>
          </div>
        </div>
        <div className={styles.comment}>
          <div className={styles.user}>
            {/* <Image src="" alt="" width={50} height={50} className={styles.image}/> */}
            <div className={styles.userInfo}>
              <span className={styles.username}>Jay Liu</span>
              <span className={styles.date}>02/04/2025</span>
            </div>
          </div>
          <div className={styles.content}>
           <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, iusto libero? Praesentium porro autem, laudantium impedit, facere nostrum enim facilis quam quas adipisci maiores vel, fugit alias. Laboriosam, odio non.</p>
          </div>
        </div>
        <div className={styles.comment}>
          <div className={styles.user}>
            {/* <Image src="" alt="" width={50} height={50} className={styles.image}/> */}
            <div className={styles.userInfo}>
              <span className={styles.username}>Jay Liu</span>
              <span className={styles.date}>02/04/2025</span>
            </div>
          </div>
          <div className={styles.content}>
           <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, iusto libero? Praesentium porro autem, laudantium impedit, facere nostrum enim facilis quam quas adipisci maiores vel, fugit alias. Laboriosam, odio non.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Comments