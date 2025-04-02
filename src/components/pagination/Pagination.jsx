"use client";

import React from 'react';
import styles from './pagination.module.css';
import { useRouter } from 'next/navigation';

const Pagination = ({ page, slug, hasPrev, hasNext }) => {
  const router = useRouter();

  const handlePrev = () => {
    if (!hasPrev) return;
    if (slug) {
      router.push(`/posts/${hasPrev.slug}`);
    } else {
      router.push(`?page=${page - 1}`);
    }
  };

  const handleNext = () => {
    if (!hasNext) return;
    if (slug) {
      router.push(`/posts/${hasNext.slug}`);
    } else {
      router.push(`?page=${page + 1}`);
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.button}
        disabled={!hasPrev}
        onClick={handlePrev}
      >
        Previous
      </button> 
      <button 
        className={styles.button}
        disabled={!hasNext}
        onClick={handleNext}
      >
        Next
      </button>      
    </div>
  )
}

export default Pagination;