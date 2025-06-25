"use client";

import { useEffect } from "react";

const ViewTracker = ({ slug }) => {
  useEffect(() => {
    const registerView = async () => {
      try {
        await fetch(`/api/posts/${slug}`, {
          method: "POST",
        });
      } catch (error) {
        console.error("View registration failed", error);
      }
    };

    registerView();
  }, [slug]);

  return null;
};

export default ViewTracker;