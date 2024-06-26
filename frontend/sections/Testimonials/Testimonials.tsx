import React, { useState, useEffect } from "react";
import "./Testimonial.scss";

import Image from "next/image";

import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

import { motion } from "framer-motion";

import { Wrapper, MotionWrap } from "@/wrapper";
import { urlFor, client } from "@/sanity/client";

interface TestimonialData {
  _id: string;
  name: string;
  company: string;
  feedback: string;
  imgurl: ImageData;
}

interface BrandData {
  _id: string;
  name: string;
  imgUrl: ImageData;
}

interface ImageData {
  _ref: string;
  asset: AssetData;
}

interface AssetData {
  _ref: string;
  _type: string;
  path: string;
  url: string;
}

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
  const [brands, setBrands] = useState<BrandData[]>([]);

  const handleClick = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const query = '*[_type == "testimonials"]';
    const brandsQuery = '*[_type == "brands"]';

    client.fetch(query).then((data) => {
      setTestimonials(data);
    });

    client.fetch(brandsQuery).then((data) => {
      setBrands(data);
    });
  }, []);

  return (
    <>
      {testimonials.length && (
        <>
          <div className="app__testimonial-item app__flex">
            <Image
              src={urlFor(testimonials[currentIndex].imgurl).url()}
              alt={testimonials[currentIndex].name}
            />
            <div className="app__testimonial-content">
              <p className="p-text">{testimonials[currentIndex].feedback}</p>
              <div>
                <h4 className="bold-text">{testimonials[currentIndex].name}</h4>
                <h5 className="p-text">{testimonials[currentIndex].company}</h5>
              </div>
            </div>
          </div>

          <div className="app__testimonial-btns app__flex">
            <div
              className="app__flex"
              onClick={() =>
                handleClick(
                  currentIndex === 0
                    ? testimonials.length - 1
                    : currentIndex - 1
                )
              }
            >
              <HiChevronLeft />
            </div>

            <div
              className="app__flex"
              onClick={() =>
                handleClick(
                  currentIndex === testimonials.length - 1
                    ? 0
                    : currentIndex + 1
                )
              }
            >
              <HiChevronRight />
            </div>
          </div>
        </>
      )}

      <div className="app__testimonial-brands app__flex">
        {brands.map((brand) => (
          <motion.div
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, type: "tween" }}
            key={brand._id}
          >
            <Image src={urlFor(brand.imgUrl).url()} alt={brand.name} />
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default Wrapper(
  MotionWrap(Testimonial, "app__testimonial"),
  "testimonial",
  "app__primarybg"
);
