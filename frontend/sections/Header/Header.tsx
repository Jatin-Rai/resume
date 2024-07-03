"use client";

import React from "react";
import "./Header.scss";

import Image from "next/image";

import { MdFileDownload } from "react-icons/md";

import { motion } from "framer-motion";

import { images } from "@/constants";
import { Wrapper } from "@/wrapper";

interface HeaderProps {}

const scaleVariants = {
  whileInView: {
    scale: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

const Header: React.FC<HeaderProps> = () => {
  return (
    <div className="app__header app__flex">
      <motion.div
        whileInView={{ x: [-100, 0], opacity: [0, 1] }}
        transition={{ duration: 0.5 }}
        className="app__header-info"
      >
        <div className="app__header-badge">
          <div className="badge-cmp app__flex">
            <span>👋</span>
            <div style={{ marginLeft: 20 }}>
              <p className="p-text">Hello, I am</p>
              <h1 className="head-text">Jatin</h1>
            </div>
          </div>

          <div className="tag-cmp app__flex">
            <p className="p-text">Frontend Developer</p>
            <p className="p-text">Software Engineer</p>
          </div>
          <div className="tag-cmp app__flex">
            <a
              href="/cv/jatin-rai-cv.pdf"
              target="_blank"
              rel="noreferrer"
              className="p-text app__flex app__cv"
            >
              My CV
              <MdFileDownload className="app__download-icon" />
            </a>
          </div>
        </div>
      </motion.div>

      <motion.div
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__header-img"
      >
        <Image src={images.profile} alt="profile_bg" height={400} />
        <motion.div
          whileInView={{ scale: [0, 1] }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <Image
            src={images.circle}
            alt="profile_circle"
            className="overlay_circle"
          />
        </motion.div>
      </motion.div>

      <motion.div
        variants={scaleVariants}
        whileInView={scaleVariants.whileInView}
        className="app__header-circles"
      >
        {[images.nextjs, images.react, images.redux].map((circle, index) => (
          <div className="circle-cmp app__flex" key={`circle-${index}`}>
            <Image src={circle} alt="profile_bg" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Wrapper(Header, "home");
