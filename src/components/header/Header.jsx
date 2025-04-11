import React from 'react'
import styles from './header.module.css'

const Header = () => {
  return (
    <header className={styles.container}>
      <h1 className={styles.title}>
        <b>GamerBlog</b>
        <div>
          <span className={styles.span}>Let</span>
          <span className={styles.span}> us</span>
          <span className={styles.span}> start</span>
          <span className={styles.span}> the</span>
          <span className={styles.span}> game</span>.
        </div>
      </h1>
    </header>
  )
}

export default Header;