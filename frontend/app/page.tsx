"use client";

import { useState, useEffect } from "react";
import "./page.scss";

import { Loader } from "@/components";
import { About, Blog, Footer, Header, Skills, Work } from "@/sections";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a 2-second delay before displaying content
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Clear the timer on component unmount to avoid memory leaks
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <About />
          <Blog />
          <Work />
          <Skills />
          <Footer />
        </>
      )}
    </div>
  );
}
