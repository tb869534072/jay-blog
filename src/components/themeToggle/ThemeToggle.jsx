"use client";

import { useContext } from 'react';
import styles from './themeToggle.module.css';
import { ThemeContext } from '@/context/ThemeContext';

const ThemeToggle = () => {
  const { toggle, theme } = useContext(ThemeContext);

  return (
    <div 
      className={styles.container} 
      onClick={toggle}
      style={
        theme === "dark" ? { backgroundColor: "white" } : { backgroundColor: "#0f172a" }
      }
    >
      <div 
        className={styles.ball} 
        style={
          theme === "dark" 
          ? { left: 1, background: "#0f172a" }
          : { right: 1, background: "white" }
        }
      >
      </div>
    </div>
  )
}

export default ThemeToggle