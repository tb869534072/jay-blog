import React from 'react'
import styles from './navbar.module.css'
import Link from 'next/link';
import ThemeToggle from '@/components/themeToggle/ThemeToggle';
import AuthLinks from '@/components/authLinks/AuthLinks';

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Jay Liu</div>
      <div className={styles.links}>
        <ThemeToggle/>
        <Link href=''>Home</Link>
        <AuthLinks/>
      </div>
    </div>
  )
}

export default Navbar