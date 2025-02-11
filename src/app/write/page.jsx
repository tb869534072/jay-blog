"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './writePage.module.css';
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

const WritePage = () => {

  const [open, setOpen] = useState(false);
  const [editorLoaded, setEditorLoaded] = useState(false);

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

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
  })

  return (
    <div className={styles.container}>
      <input type='text' placeholder='Title' className={styles.title} />
      <div className={styles.editor}>
        {open === false ? (
          <button className={styles.button} onClick={() => setOpen(!open)}>+</button>
        ) : (
          <button className={styles.button} onClick={() => setOpen(!open)}>-</button>
        )}
        {open && (
          <div className={styles.add}>
            <button className={styles.addButton}>
              <Image src='/image.svg' alt='image' width={24} height={24}/>
            </button>
            <button className={styles.addButton}>
              <Image src='/video.svg' alt='video' width={24} height={24}/>
            </button>
            <button className={styles.addButton}>
              <Image src='/external.svg' alt='external' width={28} height={28}/>
            </button>
          </div>
        )}
        {editorLoaded ? (
          <EditorContent editor={editor} className={styles.textArea} />
        ) : (
          <p>Loading editor...</p>
        )}
      </div>
      <button className={styles.publish}>Publish</button>
    </div>
  )
}

export default WritePage