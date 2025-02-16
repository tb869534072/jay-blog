"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';
import styles from './loginPage.module.css';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {

  const { status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.socialButton} onClick={() => signIn("google")}>Sign in with Google
          <Image src='/google.svg' alt='google' width={20} height={20}/>
        </div>
        <div className={styles.socialButton}>Sign in with Github
          <Image src='/github.svg' alt='github' width={20} height={20}/>
        </div>
      </div>
    </div>
  )
}

export default LoginPage