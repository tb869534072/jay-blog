export const getPostData = async(slug) => {
    const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }

    return res.json();
};