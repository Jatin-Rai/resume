"use client";

import { useState, useEffect } from "react";
import "./BlogDetail.scss";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

import { client, urlFor } from "@/sanity/client";
import { PortableText } from "@portabletext/react";

import { Loader } from "..";
import { MotionWrap } from "@/wrapper";

interface BlogData {
  title: string;
  body: [];
  slug: { current: string };
  imgUrl: string;
  _createdAt: Date;
  _updatedAt: Date;
}

const BlogDetail = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<BlogData | null>(null);

  useEffect(() => {
    if (slug) {
      // Simulate a 2-second delay before fetching data
      const timer = setTimeout(() => {
        const query = `*[_type == "blogs" && slug.current == $slug][0]`;

        client.fetch(query, { slug }).then((data: BlogData | null) => {
          setBlog(data);
          setLoading(false);
        });
      }, 1000);

      // Clear the timer on component unmount to avoid memory leaks
      return () => clearTimeout(timer);
    }
  }, [slug]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="app__blog-detail">
          <div className="app__blog-link-container">
            <Link href="/blogs">Go Back</Link>
            <Link href="/">Home</Link>
          </div>
          <article>
            <h1>{blog?.title}</h1>
            <Image
              src={urlFor(blog?.imgUrl || "").url()}
              alt={blog?.title || ""}
              height={300}
              width={400}
              layout="responsive"
            />
            <div className="app__blog-date">
              <p>
                Posted on{" "}
                {new Date(blog?._createdAt || "").toDateString().slice(4)}
              </p>
              <p>
                Updated on{" "}
                {new Date(blog?._updatedAt || "").toDateString().slice(4)}
              </p>
            </div>
            <div className="app__blog-portable-text">
              <PortableText value={blog?.body || []} />
            </div>
          </article>
          <div className="app__blog-link-container">
            <Link href="/blogs">Go Back</Link>
            <Link href="/">Home</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default MotionWrap(BlogDetail);
