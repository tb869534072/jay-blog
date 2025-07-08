import { getBaseUrl } from '@/lib/getBaseUrl';

export const getPostData = async(slug) => {
  try {
    const res = await fetch(`${getBaseUrl()}/api/posts/${slug}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error("Failed to fetch posts.");
    }

    return res.json();
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong.")
  }
};