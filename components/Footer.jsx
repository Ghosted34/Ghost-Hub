import React from "react";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="footer-container">
      <p>2022 All rights Reserved</p>
      <p className="icons">
        <AiFillInstagram /> <AiOutlineTwitter />
      </p>
    </footer>
  );
};

export default Footer;
