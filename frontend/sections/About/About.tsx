"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

import { motion } from "framer-motion";

import "./About.scss";

import { client, urlFor } from "@/sanity/client";
import { Wrapper, MotionWrap } from "@/wrapper";

interface AboutData {
  _type: string;
  title: string;
  imgUrl: string;
  description: string;
}

const About: React.FC = () => {
  const [abouts, setAbouts] = useState<AboutData[]>([]);

  useEffect(() => {
    const query = `*[_type == "abouts"]`;

    client.fetch(query).then((data) => {
      setAbouts(data);
    });
  }, []);

  return (
    <>
      <div className="app__about" />
      <h2 className="head-text">
        About
        <span> me</span>
      </h2>

      <div className="app__profiles">
        {abouts &&
          abouts.map((about, index) => (
            <motion.div
              key={about.title + index}
              whileInView={{ opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5, type: "tween" }}
              className="app__profile-item"
            >
              <Image
                src={urlFor(about.imgUrl).url()}
                width={200}
                height={200}
                alt={about.title}
              />
              <h2 className="bold-text" style={{ marginTop: "20px" }}>
                {about.title}
              </h2>
              <h2 className="bold-text" style={{ marginTop: "20px" }}>
                {about.description}
              </h2>
            </motion.div>
          ))}
      </div>
    </>
  );
};

export default Wrapper(
  MotionWrap(About, "app__about"),
  "about",
  "app__whitebg"
);
