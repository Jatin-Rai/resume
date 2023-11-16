"use client";

import React from "react";
import "./BlogCard.scss";

import Link from "next/link";

import { urlFor } from "@/sanity/client";

import { PortableText } from "@portabletext/react";

interface Blog {
  imgUrl: string;
  _createdAt: Date;
  _updatedAt: Date;
  title: string;
  body: any;
  slug: { current: string };
}

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const { imgUrl, _createdAt, _updatedAt, title, body, slug } = blog;

  return (
    <div className="blog__card">
      <div className="blog__meta">
        <div
          className="blog__photo"
          style={{ backgroundImage: `url(${urlFor(imgUrl).url()})` }}
        ></div>
        <ul className="blog__details">
          <li className="blog__author">
            <Link href="/" as="/" passHref>Author: Jatin Rai</Link>
          </li>
          <li className="blog__date">
            Created: {new Date(_createdAt).toDateString().slice(4)}
          </li>
          <li className="blog__date">
            Updated: {new Date(_updatedAt).toDateString().slice(4)}
          </li>
          {/* <li className="blog__tags">
            <ul>
              {tags.map((tag, index) => (
                <li key={index}>
                  <a href="#">{tag}</a>
                </li>
              ))}
            </ul>
          </li> */}
        </ul>
      </div>
      <div className="blog__body">
        <h1>{title}</h1>
        <p>
          <PortableText value={body} />
        </p>
        <span className="blog__read-more">
          <Link href={`/blogs/${slug.current}`} as={`/blogs/${slug.current}`} passHref>Read More</Link>
        </span>
      </div>
    </div>
  );
};

export default BlogCard;
