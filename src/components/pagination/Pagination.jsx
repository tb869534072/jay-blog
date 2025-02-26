"use client";

import React from 'react';
import styles from './pagination.module.css';
import { useRouter } from 'next/navigation';

const Pagination = ({ page, slug, hasPrev, hasNext }) => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <button 
        className={styles.button}
        disabled={!hasPrev}
        onClick={()=>
          slug ? (
            router.push(`/posts/${hasPrev.slug}`)
          ): (
            router.push(`?page=${page - 1}`)
        )}
      >
        Previous
      </button> 
      <button 
        className={styles.button}
        disabled={!hasNext}
        onClick={()=>
          slug ? (
            router.push(`/posts/${hasNext.slug}`)
          ): (
            router.push(`?page=${page + 1}`)
        )}
      >
        Next
      </button>      
    </div>
  )
}

export default Pagination