"use client";

import React, { useEffect, useRef, useState } from 'react';
import styles from './authLinks.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import useClickOutside from '@/lib/clickOutside';


const AuthLinks = ({open, setOpen}) => {
  const { data: session, status } = useSession();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const firstname = session?.user?.name?.split(" ")[0] ?? "guest";

  const handleAvatarClick = () => {
    setShowMenu((prev) => !prev);
  }

  const handleBurgerClick = () => {
    setOpen((prev) => !prev);
  }

  const closeMenu = () => {
    setShowMenu(false)
  }

  const closeResponsive = () => {
    setOpen(false);
  }

  useClickOutside(menuRef, closeMenu);

  useEffect(() => {
    if (open) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [open]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 641px)");
    const handleResize = () => {
      if (mediaQuery.matches) {
        closeResponsive();
      }
    };
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, [setOpen]);

  return (
    <>
      {status !== "authenticated" ? (
        <Link href="/login" className={styles.login}>Login</Link>
      ) : (
        <>
        { session?.user && (
          <div className={styles.userMenu} ref={menuRef}>
            <Image
              src={session.user.image || "/avatar.png"}
              alt="avatar"
              width={32}
              height={32}
              className={styles.avatar}
              onClick={handleAvatarClick}
              aria-expanded={showMenu}
            />
            { showMenu && (
              <div className={styles.dropdown} role="menu">
                <div className={styles.greeting}>Hi, <span>{firstname}</span></div>
                <Link 
                  href="/write" 
                  className={styles.dropdownItem} 
                  onClick={closeMenu}
                >
                  Write
                </Link>
                <div className={`${styles.dropdownItem} ${styles.logout}`} onClick={signOut}>Logout</div>
            </div>
            )}
          </div>
        )}
        </>
      )}
      <div 
        className={`${styles.burgerContainer} ${open ? styles.flipped : ""}`} 
        onClick={handleBurgerClick}
      >
        <div className={styles.burger}>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
        </div>
        <div className={styles.closeMenu}>✖</div>
      </div>
      <div className={`${styles.responsiveMenu} ${open ? styles.open : ""}`}>
        <Link href="/" onClick={closeResponsive}>Home</Link>
        <Link href="/about" onClick={closeResponsive}>About</Link>
        <Link href="/contact" onClick={closeResponsive}>Contact</Link>
        {status !== "authenticated" ? (
        <Link href="/login" onClick={closeResponsive}>Login</Link>
        ) : (
        <>
          <Link href="/write" onClick={closeResponsive}>Write</Link>
          <div className={styles.burgerLogout} onClick={signOut}>Logout</div>
        </>
        )}
      </div>
    </>
  )
}

export default AuthLinks;