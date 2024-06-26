"use client";
import React, { useState, useEffect } from "react";
import "./Skills.scss";

import Image from "next/image";

import { motion } from "framer-motion";

import ReactTooltip from "react-tooltip";

import { Wrapper, MotionWrap } from "@/wrapper";
import { urlFor, client } from "@/sanity/client";

interface Skill {
  _type: string;
  name: string;
  bgColor: string;
  icon: string;
}
interface Experience {
  _type: string;
  year: string;
  works: {
    name: string;
    company: string;
    desc: string;
  }[];
}

const Skills: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    const query = '*[_type == "experiences"]';
    const skillsQuery = '*[_type == "skills"]';

    client.fetch(query).then((data) => {
       // Parse the year ranges into objects with separate start and end dates
    data.forEach((exp: any) => {
      const [endMonth, endYear] = exp.year.split(/[\s-]+/);
      exp.endDate = new Date(`${endMonth} ${endYear}`);
    });
    
    // Sort experiences in descending order based on the end date
    data.sort((a:any, b:any) => (a.endDate > b.endDate ? -1 : 1));
      setExperiences(data);
    });

    client.fetch(skillsQuery).then((data) => {
      setSkills(data);
    });
  }, []);

  return (
    <>
      <div className="app__skills" />
      <h2 className="head-text">
        Skills & <span>Experiences</span>
      </h2>

      <div className="app__skills-container">
        <motion.div className="app__skills-list">
          {skills.map((skill) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="app__skills-item app__flex"
              key={skill.name}
            >
              <div
                className="app__flex"
                style={{ backgroundColor: skill.bgColor }}
              >
                <Image
                  src={urlFor(skill.icon).url()}
                  alt={skill.name}
                  width={50}
                  height={50}
                />
              </div>
              <p className="p-text">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>
        <div className="app__skills-exp">
          {experiences.map((experience) => (
            <motion.div className="app__skills-exp-item" key={experience.year}>
              <div className="app__skills-exp-year">
                <p className="bold-text">{experience.year}</p>
              </div>
              <motion.div className="app__skills-exp-works">
                {experience.works.map((work) => (
                  <>
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.5 }}
                      className="app__skills-exp-work"
                      data-tip
                      data-for={work.name}
                      key={work.name}
                    >
                      <h4 className="bold-text">{work.name}</h4>
                      <p className="p-text">{work.company}</p>
                    </motion.div>
                    <ReactTooltip
                      id={work.name}
                      effect="solid"
                      arrowColor="#fff"
                      className="skills-tooltip"
                    >
                      {work.desc}
                    </ReactTooltip>
                  </>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Wrapper(
  MotionWrap(Skills, "app__skills"),
  "skills",
  "app__whitebg"
);
