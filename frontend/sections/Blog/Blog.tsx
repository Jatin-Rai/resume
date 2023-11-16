"use client";

import React, { useState, useEffect } from "react";
import "./Blog.scss";

import Image from "next/image";
import Link from "next/link";

import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

import { MotionWrap, Wrapper } from "@/wrapper";
import { client, urlFor } from "@/sanity/client";

interface BlogsData {
  _type: string;
  title: string;
  body: [];
  slug: { current: string };
  imgUrl: string;
  _updatedAt: Date;
}

const Blog = () => {
  const [blogs, setBlogs] = useState<BlogsData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(1);

  const handleClick = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const query = `*[_type == "blogs"] | order(_createdAt desc)`;

    client.fetch(query).then((data) => {
      setBlogs(data);
    });
  }, []);

  return (
    <>
      <h2 className="head-text">
        Check out <span>my latest Blog</span>
      </h2>
      {blogs.length && (
        <>
          <div className="app__blog-item app__flex">
            <div className="app__blog-content">
              <Image
                src={urlFor(blogs[currentIndex].imgUrl).url()}
                alt={blogs[currentIndex].title}
                width={200}
                height={200}
              />
              <p className="p-text">{blogs[currentIndex].title}</p>
              <div>
                {/* <h4 className="bold-text">{blogs[currentIndex].desc}</h4> */}
                <h5 className="p-text">
                  {new Date(blogs[currentIndex]._updatedAt)
                    .toDateString()
                    .slice(4)}
                </h5>
              </div>
              <Link
                href={`/blogs/${blogs[currentIndex].slug.current}`}
                as={`/blogs/${blogs[currentIndex].slug.current}`}
                passHref
              >
                <span>Read Article</span>
              </Link>
            </div>
          </div>

          <div className="app__blog-btns app__flex">
            <div
              className="app__flex"
              onClick={() =>
                handleClick(
                  currentIndex === 0 ? blogs.length - 1 : currentIndex - 1
                )
              }
            >
              <HiChevronLeft />
            </div>
            <Link href="/blogs" as="/blogs" passHref>
              View All
            </Link>

            <div
              className="app__flex"
              onClick={() =>
                handleClick(
                  currentIndex === blogs.length - 1 ? 0 : currentIndex + 1
                )
              }
            >
              <HiChevronRight />
            </div>
          </div>
        </>
      )}

      {/* <div className="app__testimonial-brands app__flex">
        {brands.map((brand) => (
          <motion.div
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, type: "tween" }}
            key={brand._id}
          >
            <Image src={urlFor(brand.imgUrl).url()} alt={brand.name} />
          </motion.div>
        ))}
      </div> */}
    </>
  );
};

export default Wrapper(
  MotionWrap(Blog, "app__blogs"),
  "blog",
  "app__primarybg"
);
