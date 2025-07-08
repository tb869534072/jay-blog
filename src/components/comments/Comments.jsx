"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './comments.module.css';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { getBaseUrl } from '@/lib/getBaseUrl';

const fetcher = async(url) => {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message)
  }
  return data;
}

const Comments = ({ postSlug }) => {
  const { status } = useSession();

  const { data, isLoading, mutate } = useSWR(
    `${getBaseUrl()}/api/comments?postSlug=${postSlug}`,
    fetcher
  );

  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async() => {
    if (!description.trim()) return;
    if (isSubmitting) return;
    setIsSubmitting(true);
  
    try {
      await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, postSlug }),
      });
  
      mutate();
      location.reload();
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comments</h1>
      {status === "authenticated" ? (
        <div className={styles.write}>
          <textarea 
            placeholder="Write a comment..."
            className={styles.input}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button 
            className={styles.button} 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </div>
        ) : (
          <Link href="/login" className={styles.login}>Login to write a comment</Link>
        )
      }
      <div className={styles.comments}>
        {isLoading 
          ? "isLoading"
          : data?.map((item) => (
              <div className={styles.comment} key={item._id || item.id}>
                <div className={styles.user}>
                  <div className={styles.userIconContainer}>
                    {item.user.image ? (
                      <Image
                        src={item.user.image} 
                        alt="" 
                        fill 
                        className={styles.icon} 
                        sizes="(max-width: 128px) 100vw, (max-width: 128px) 50vw, 33vw"
                      />
                      ): (
                      <Image
                        src="/icon.png"
                        alt="" 
                        fill 
                        className={styles.icon} 
                        sizes="(max-width: 128px) 100vw, (max-width: 128px) 50vw, 33vw"
                      />
                    )}
                  </div>
                  <div className={styles.userInfo}>
                    <span className={styles.username}>{item.user.name}</span>
                    <span className={styles.date}>{item.createdAt.slice(0, 10)}</span>
                  </div>
                </div>
                <div className={styles.description}>{item.description}</div>
              </div>
          ))
        }
      </div>
    </div>
  )
}

export default Comments;