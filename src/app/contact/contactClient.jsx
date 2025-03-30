"use client";

import React, { useState } from 'react';
import styles from './contactPage.module.css';

const ContactClient = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: ""});
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (res.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: ""});
      } else {
        setStatus("Error sending message. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
      setStatus("Error sending message. Please try again.");
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.title}>Jay Liu</div>
        <div>jaylzq777@gmail.com</div>
      </div>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={formData.email}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <textarea
          name="message"
          placeholder="Your message"
          value={formData.message}
          onChange={handleChange}
          className={styles.message}
          required
        ></textarea>
        <button type="submit" disabled={status === "Sending..."} className={styles.button}>Send</button>
        {status && <p className={styles.statusMessage}>{status}</p>}
      </form>
    </div>
  )
}

export default ContactClient;