"use client";

import React, { useState } from "react";
import "./Navbar.scss";

import Image from "next/image";
import Link from "next/link";

import { images } from "@/constants";

import { motion } from "framer-motion";

import { HiMenuAlt4, HiX } from "react-icons/hi";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  const navItems = ["home", "about", "projects", "skills", "contact"];

  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <Link href="/" as="/">
          <Image src={images.logo} alt="logo" />
        </Link>
      </div>
      <ul className="app__navbar-links">
        {navItems.map((item) => (
          <li className="app__flex p-text" key={`link-${item}`}>
            <div />
            <a href={`#${item}`}>{item}</a>
          </li>
        ))}
      </ul>

      <div className="app__navbar-menu">
        <HiMenuAlt4 onClick={() => setToggle(true)} />

        {toggle && (
          <motion.div
            whileInView={{ x: [300, 0] }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          >
            <HiX onClick={() => setToggle(false)} />
            <ul>
              {navItems.map((item) => (
                <li key={item}>
                  <a href={`#${item}`} onClick={() => setToggle(false)}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
