import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './loginPage.module.css';

const LoginPage = () => {
  return (
    <div className={styles.container}>
    <div className={styles.imgContainer}>
    </div>
    <div className={styles.textContainer}>
        <span className={styles.date}>01.30.2025</span>
        <h1>Title</h1>
        <p className={styles.description}>description</p>     
    </div>
    </div>
  )
}

export default LoginPage