"use client";

import React, { useState } from 'react'
import styles from './navbar.module.css'
import Link from 'next/link';
import ThemeToggle from '@/components/themeToggle/ThemeToggle';
import AuthLinks from '@/components/authLinks/AuthLinks';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className={styles.container}>
      <Link href='/' className={styles.logo} onClick={()=>setOpen(false)}>GamerBlog</Link>
      <div className={styles.links}>
        <ThemeToggle/>
        <Link href='/' className={styles.link}>Home</Link>
        <Link href='/about' className={styles.link}>About</Link>
        <Link href='/contact' className={styles.link}>Contact</Link>
        <AuthLinks open={open} setOpen={setOpen}/>
      </div>
    </nav>
  )
}

export default Navbar;