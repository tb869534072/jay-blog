import React from 'react';
import styles from './singlePost.module.css';
import Image from 'next/image';
import Pagination from "@/components/pagination/Pagination";
import Comments from "@/components/comments/Comments";

const getData = async(slug) => {
  const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  
  return res.json();
};

const SinglePost = async props => {
  const params = await props.params;
  const { slug } = params;
  const data = await getData(slug);

  const hasPrev = await getData(parseInt(slug) - 1);
  const hasNext = await getData(parseInt(slug) + 1);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{data?.title}</h1>
          <div className={styles.user}>
            <div className={styles.userIconContainer}>
              {data?.user.image ? (
                <Image
                  src={data.user.image} 
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
            <div className={styles.userTextContainer}>
              <span className={styles.username}>{data?.user.name}</span>
              <span className={styles.date}>{data?.createdAt.slice(0, 10)}</span>
            </div>
          </div>
        </div>
        <div className={styles.imageContainer}>
          {data?.img && (
            <Image src={data.img} alt="" fill className={styles.image} />
          )}
        </div>
      </div>
      <div className={styles.content} dangerouslySetInnerHTML={{__html: data?.description}}/>
      <Pagination slug={slug} hasPrev={hasPrev} hasNext={hasNext}/>
      <Comments postSlug={slug}/>
    </div>
  )
}

export default SinglePost