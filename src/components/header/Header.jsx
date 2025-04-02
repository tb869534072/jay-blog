import React from 'react'
import styles from './header.module.css'

const Header = () => {
  return (
    <header className={styles.container}>
      <h1 className={styles.title}>
        <b>GamerBlog</b>
        <p>
          <span className={styles.let}>Let</span>
          <span className={styles.us}> us</span>
          <span className={styles.start}> start</span>
          <span className={styles.the}> the</span>
          <span className={styles.game}> game</span>.
        </p>
      </h1>
    </header>
  )
}

export default Header;