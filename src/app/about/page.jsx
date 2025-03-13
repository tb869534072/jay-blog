import React from 'react';
import styles from './aboutPage.module.css';

const AboutPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>A Save Point for Gaming Stories & Reviews</div>
      <div className={styles.content}>
        <p className={styles.paragraph}>
          Welcome to my little corner of the internet, where I dive into the worlds of RPGs and Action Games (ACTs)
          —the kind of games that pull you in with deep stories, intense combat, and unforgettable moments.
        </p>
        <p className={styles.paragraph}>
          Here, you’ll find a mix of casual reviews, personal gaming stories, and thoughts on the games that have 
          stuck with me the most. From unraveling the mysteries of Persona, to conquering brutal bosses in Elden Ring, 
          to the thrill of the hunt in Monster Hunter, this blog is all about celebrating the games that keep us 
          coming back for more.
        </p>
        <p className={styles.paragraph}>
          Whether you’re here to discover new games, reminisce about old favorites, or just enjoy a fellow gamer’s 
          perspective, welcome aboard. Let’s start the game!
        </p>
      </div>
    </div>
  )
}

export default AboutPage