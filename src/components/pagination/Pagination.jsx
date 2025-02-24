"use client";

import React from 'react';
import styles from './pagination.module.css';
import { useRouter } from 'next/navigation';

const Pagination = ({ slug, page, hasPrev, hasNext }) => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <button 
        className={styles.button}
        disabled={!hasPrev}
        onClick={()=>
          slug ? (
            router.push(`/posts/${parseInt(slug) - 1}`)
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
            router.push(`/posts/${parseInt(slug) + 1}`)
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