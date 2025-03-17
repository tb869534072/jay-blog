"use client";

import React, { useEffect, useState } from 'react';
import styles from './authLinks.module.css';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

const AuthLinks = () => {
  const [open, setOpen] = useState(false);
  const { status } = useSession();

  useEffect(() => {
    if (open) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [open]);
  
  return (
    <>
      {status !== "authenticated" ? (
        <Link href="/login" className={styles.link}>Login</Link>
      ) : (
        <>
          <Link href="/write" className={styles.link}>Write</Link>
          <div className={styles.link} onClick={signOut}>Logout</div>
        </>
      )}
      <div 
        className={`${styles.burgerContainer} ${open ? styles.flipped : ""}`} 
        onClick={()=>setOpen(!open)}
      >
        <div className={styles.burger}>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
        </div>
        <div className={styles.closeMenu}>✖</div>
      </div>
      <div className={`${styles.responsiveMenu} ${open ? styles.open : ""}`}>
        <Link href="/" onClick={()=>setOpen(false)}>Home</Link>
        <Link href="/about" onClick={()=>setOpen(false)}>About</Link>
        <Link href="/contact" onClick={()=>setOpen(false)}>Contact</Link>
        {status !== "authenticated" ? (
        <Link href="/login" onClick={()=>setOpen(false)}>Login</Link>
        ) : (
        <>
          <Link href="/write" onClick={()=>setOpen(false)}>Write</Link>
          <div className={styles.signOut} onClick={signOut}>Logout</div>
        </>
        )}
      </div>
    </>
  )
}

export default AuthLinks