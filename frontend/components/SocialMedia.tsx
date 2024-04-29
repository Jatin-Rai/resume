import React from "react";

// import { BsInstagram } from "react-icons/bs";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const SocialMedia = () => {
  return (
    <div className="app__social">
      {/* <div>
        <a
          href="https://www.instagram.com/jatin.j.rai"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsInstagram />
        </a>
      </div> */}
      <div>
        <a
          href="https://linkedin.com/in/jatinrai96"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin />
        </a>
      </div>
      <div>
        <a
          href="https://github.com/Jatin-Rai"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
        </a>
      </div>
    </div>
  );
};

export default SocialMedia;
