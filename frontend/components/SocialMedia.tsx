import React from "react";

import { FaLinkedin, FaGithub, FaDev } from "react-icons/fa";

const SocialMedia = () => {
  return (
    <div className="app__social">
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
      <div>
        <a
          href="https://dev.to/jatinrai"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaDev />
        </a>
      </div>
    </div>
  );
};

export default SocialMedia;
