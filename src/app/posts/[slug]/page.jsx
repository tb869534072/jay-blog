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
  const { post, prevPost, nextPost } = await getData(slug);

  return (
    <div className={styles.container}>
      <div className={styles.postContainer}>
        <div className={styles.infoContainer}>
          <h1 className={styles.title}>{post?.title}</h1>
          <div className={styles.user}>
            <div className={styles.userIconContainer}>
              {post?.user.image ? (
                <Image
                  src={post.user.image} 
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
              <span className={styles.username}>{post?.user.name}</span>
              <span className={styles.date}>{post?.createdAt.slice(0, 10)}</span>
            </div>
          </div>
        </div>
        {post?.img && (
          <div className={styles.imageContainer}>
            <Image src={post.img} alt="" fill className={styles.image} priority/>
          </div>
        )}
        <div className={styles.content} dangerouslySetInnerHTML={{__html: post?.description}}/>
      </div>
      <Pagination slug={slug} hasPrev={prevPost} hasNext={nextPost}/>
      <Comments postSlug={slug}/>
    </div>
  )
}

export default SinglePost