import React, { Suspense } from 'react';
import styles from './singlePost.module.css';
import Image from 'next/image';
import Pagination from "@/components/pagination/Pagination";
import Comments from "@/components/comments/Comments";
import ViewTracker from "@/components/viewTracker/ViewTracker";
import { getPostData } from "@/lib/posts";
import { notFound } from 'next/navigation';

export async function generateMetadata(props) {
  const { slug } = await props.params;
  const { post } = await getPostData(slug);

  return {
    title: "GamerBlog | " + (post.title || "Post"),
    description: post.description.slice(0, 150) || "Read a blog post.",
  };
}

const SinglePost = async (props) => {
  const { slug } = await props.params;
  const { post, prevPost, nextPost } = await getPostData(slug);
  const formatDate = (date) => new Date(date).toLocaleDateString();

  if (!post) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <ViewTracker slug={slug} />
      <div className={styles.postContainer}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>{post.title}</h1>
          </div>
          <div className={styles.user}>
            <div className={styles.userIconContainer}>
              {post.user.image ? (
                <Image
                  src={post.user.image} 
                  alt="User icon" 
                  fill 
                  className={styles.icon} 
                  sizes="(max-width: 128px) 100vw, (max-width: 128px) 50vw, 33vw"
                />
                ): (
                <Image
                  src="/icon.png"
                  alt="User icon" 
                  fill 
                  className={styles.icon} 
                  sizes="(max-width: 128px) 100vw, (max-width: 128px) 50vw, 33vw"
                />
              )}
            </div>
            <div className={styles.userTextContainer}>
              <span className={styles.username}>{post.user.name}</span>
              <span>{formatDate(post.createdAt)}</span>
            </div>
          </div>

        {post.img && (
          <div className={styles.imageContainer}>
            <Image 
              src={post.img}
              alt={`Image for post titled "${post.title}"`}
              fill 
              className={styles.image} 
              priority
            />
          </div>
        )}
        <div className={styles.content} dangerouslySetInnerHTML={{__html: post.description}}/>
      </div>
      <Pagination slug={slug} hasPrev={prevPost} hasNext={nextPost} page={undefined}/>
      <Suspense fallback={<p>Loading comments</p>}>
        <Comments postSlug={slug}/>
      </Suspense>
    </div>
  )
}

export default SinglePost;