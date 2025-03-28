"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './writePage.module.css';
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';

const WriteClient = () => {
  const { status } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  useEffect(() => {
    if (status !== "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Tell your story...",
        emptyEditorClass: "is-editor-empty",
      }),
    ],
    content: "",
    immediatelyRender: false,
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  const slugify = (string) => {
    return Date.now() + string
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const cleanHtml = (html) => {
    if (typeof window === "undefined") return html;
  
    const doc = new DOMParser().parseFromString(html, "text/html");
    doc.body.querySelectorAll("p").forEach((p) => {
      if (p.childNodes.length === 1 && p.childNodes[0].nodeType === 3) {
        const textWithBreak = document.createTextNode(p.textContent + "\n");
        p.replaceWith(textWithBreak);
      }
    });
  
    return doc.body.innerHTML.replace(/\n/g, "<br>").trim();
  };

  const handleSubmit = async() => {
    if (isSubmitting) return;

    const rawDescription = editor?.getHTML() || "";
    const description = cleanHtml(rawDescription);

    if (!title.trim() || !description.trim() || description === "<br>") {
      alert("Please fill in both the title and content before publish.");
      return;
    }

    setIsSubmitting(true);
    
    let mediaUrl = null;

    if (file) {
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage.from("blog-files").upload(fileName, file);
      if (error) {
        console.error("Upload error:", error.message);
        setIsSubmitting(false);
        return;
      }
      mediaUrl = `https://cifufmgtjgcjvzxfekaa.supabase.co/storage/v1/object/public/blog-files/${fileName}`.replace(/([^:]\/)\/+/g, "$1");
    }

    await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        img: mediaUrl,
        slug: slugify(title),
      }),
    });

    router.push("/");
  };

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>
  }

  return (
    <div className={styles.container}>
      <input
        type='text' 
        placeholder='Title' 
        className={styles.title} 
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <div className={styles.editor}>
        <div className={styles.buttons}>
          <button className={styles.expandButton} onClick={() => setOpen(!open)}>
            {open ? "➖" : "➕"}
          </button>
          <input 
            type="file"
            id="image" 
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <button className={`${styles.addButton} ${open ? styles.isVisible : ""}`}>
            <label htmlFor='image'>
              <Image src='/image.svg' alt='image' width={24} height={24}/>
            </label>
          </button>
          <button className={`${styles.addButton} ${open ? styles.isVisible : ""}`}>
            <Image src='/external.svg' alt='external' width={28} height={28}/>
          </button>
        </div>
        <div className={styles.fileContainer}>
          <div className={styles.fileName}>
            {file?.name}
          </div>
          {file && 
            <button className={styles.removeButton} onClick={removeFile}>✖</button>
          }
        </div>
        {editorLoaded ? (
          <EditorContent 
            editor={editor} 
            className={styles.textArea} 
          />
        ) : (
          <p>Loading editor...</p>
        )}
      </div>
      <button 
        className={styles.publish} 
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        Publish
      </button>
    </div>
  )
}

export default WriteClient;