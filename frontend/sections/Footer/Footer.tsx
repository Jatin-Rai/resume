"use client";

import React, { useState } from "react";
import "./Footer.scss";

import Image from "next/image";

import { images } from "@/constants";
import { Wrapper, MotionWrap } from "@/wrapper";

import sendEmail from "@/utils/sendEmail";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Footer: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState("");

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    setSendSuccess(false);
    setSendError("");  // Clear previous errors

    try {
      await sendEmail(formData);
      setSendSuccess(true);
      setFormData({ name: "", email: "", message: "" });  // Reset form on success
    } catch (error) {
      setSendError("Failed to send message. Please try again later.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <div className="app__footer" />
      <h2 className="head-text">
        Take a <span>coffee</span> & <span>chat</span> with me
      </h2>
      <div className="app__footer-cards">
        <div className="app__footer-card ">
          <Image src={images.email} alt="email" />
          <a href="mailto:jatinrai258@gmail.com" className="p-text">
            jatinrai258@gmail.com
          </a>
        </div>
        <div className="app__footer-card">
          <Image src={images.mobile} alt="phone" />
          <a href="tel:+917005616900" className="p-text">
            +91 7005616900
          </a>
        </div>
      </div>
      {!sendSuccess && (
        <form onSubmit={handleSubmit} className="app__footer-form app__flex">
          <div className="app__flex">
            <input
              className="p-text"
              type="text"
              placeholder="Your Name"
              name="name"
              value={formData.name}
              onChange={handleChangeInput}
              aria-label="Your Name"
            />
          </div>
          <div className="app__flex">
            <input
              className="p-text"
              type="email"
              placeholder="Your Email"
              name="email"
              value={formData.email}
              onChange={handleChangeInput}
              aria-label="Your Email"
            />
          </div>
          <div>
            <textarea
              className="p-text"
              placeholder="Your Message"
              value={formData.message}
              name="message"
              onChange={handleChangeInput}
              aria-label="Your Message"
            />
          </div>
          <button type="submit" className="p-text" disabled={isSending}>
            {!isSending ? "Send Message" : "Sending..."}
          </button>
        </form>
      )}
      {sendError && (
        <div>
          <h3 className="head-text">{sendError}</h3>
        </div>
      )}
      {sendSuccess && (
        <div>
          <h3 className="head-text">Thank you for getting in touch!</h3>
        </div>
      )}
    </>
  );
};

export default Wrapper(
  MotionWrap(Footer, "app__footer"),
  "contact",
  "app__primarybg"
);
