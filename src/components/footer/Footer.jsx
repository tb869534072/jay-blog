import React from 'react';
import styles from './footer.module.css';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.info}>
        <div className={styles.logo}>
          <h1 className={styles.logoText}>
            GamerBlog
          </h1>
        </div>
        <p className={styles.description}>
          Let us start the game.
        </p>
      </div>
      <div className={styles.links}>
        <span className={styles.linksTitle}>Links</span>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </footer>
  )
}

export default Footer;