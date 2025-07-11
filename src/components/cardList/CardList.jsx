import React from 'react'
import styles from './cardList.module.css'
import Card from "@/components/card/Card";
import Pagination from "@/components/pagination/Pagination";
import { getBaseUrl } from '@/lib/getBaseUrl';

const getData = async(page) => {
  const res = await fetch(`${getBaseUrl()}/api/posts?page=${page}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  
  return res.json();
};

const CardList = async({ page }) => {
  const { posts, count } = await getData(page);

  const POST_PER_PAGE = 4;
  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  return (
    <div className={styles.container}>
      <div className={styles.posts}>
        {posts?.map((item) => (
          <Card item={item} key={item._id || item.id}/>
        ))}
      </div>
      <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext}/>
    </div>
  )
}

export default CardList;