"use client";

import { useState, useEffect } from "react";

import { Loader } from "@/components";
import { About, Footer, Header, Skills, Work } from "..";

export default function SectionLayout() {
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
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <About />
          <Work />
          <Skills />
          <Footer />
        </>
      )}
    </>
  );
}
