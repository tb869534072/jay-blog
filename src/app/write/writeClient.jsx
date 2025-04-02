"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './writePage.module.css';
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from '@tiptap/extension-link';
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
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
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

  const handleAddLink = () => {
    const url = prompt("Enter the external link:");
    if (!url || !editor) return;
  
    const { state } = editor;
    const { from, to, empty } = state.selection;
  
    if (empty) {
      editor
        .chain()
        .focus()
        .insertContent([
          { type: 'text', text: ' ' },
          {
            type: 'text',
            text: url,
            marks: [
              {
                type: 'link',
                attrs: { href: url },
              },
            ],
          },
          { type: 'text', text: ' ' },
        ])
        .run();
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run();
    }
  }

  const decodeHtml = (html) => {
    return html
      .replace(/<p>(.*?)<\/p>/gi, (_, content) => content + "<br>")
      .replace(/\n/g, "<br>")
      .trim();
  };

  const slugify = (string) => {
    const base = string
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const shortId = Math.random().toString(36).substring(0, 6); 
    return `${base}-${shortId}`;
  };

  const handleSubmit = async() => {
    if (isSubmitting) return;

    const rawDescription = editor?.getHTML() || "";
    const description = decodeHtml(rawDescription);

    if (!title.trim() || !description.trim() || description === "<br>") {
      alert("Please fill in both the title and content before publish.");
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(true);
    
    let mediaUrl = null;

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          img: mediaUrl,
          slug: slugify(title),
        }),
      });
    
      if (!res.ok) {
        throw new Error("Failed to publish post.");
      }
    
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
      
      router.push("/");
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
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
          <label htmlFor='image' className={`${styles.addButton} ${open ? styles.isVisible : ""}`}>
            <Image src='/image.svg' alt='image' width={24} height={24}/>
          </label>
          <button className={`${styles.addButton} ${open ? styles.isVisible : ""}`} onClick={handleAddLink}>
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
        {isSubmitting ? "Publishing..." : "Publish"}
      </button>
    </div>
  )
}

export default WriteClient;