"use client";

import React, { useEffect, useState } from "react";
import "./BlogList.scss";

import Link from "next/link";

import { BlogCard, Loader } from "..";
import { client } from "@/sanity/client";
import { MotionWrap } from "@/wrapper";

interface BlogsData {
  _type: string;
  title: string;
  body: [];
  slug: { current: string };
  imgUrl: string;
  _updatedAt: Date;
  _createdAt: Date;
}

const BlogList: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<BlogsData[]>([]);

  useEffect(() => {
    const query = `*[_type == "blogs"] | order(_createdAt desc)`;

    // Simulate a 2-second delay before fetching data
    const timer = setTimeout(() => {
      client.fetch(query).then((data) => {
        setBlogs(data);
        setLoading(false);
      });
    }, 1000);

    // Clear the timer on component unmount to avoid memory leaks
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="blog__list-container">
          <Link href="/" passHref className="go-back-link">
            Home
          </Link>
          <ul>
            {blogs.map((blog, index) => (
              <li key={index}>
                <BlogCard blog={blog} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default MotionWrap(BlogList, "app__primarybg");
