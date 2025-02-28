import { IoMail, IoLogoLinkedin, IoLogoGithub } from "react-icons/io5";

import smoliv from "/assets/smoliv.png";

export default function About() {
  return (
    <div className="about-page-container">
      <h1>
        About
      </h1>
      <div className="about-me-container">
        <img src={smoliv} alt="Zack Cinquini" className="my-image"/>
        <div className="about-me-text">
          <h2>Zack Cinquini</h2>
          <ul>
            <li>👨‍💻 Software engineer</li>
            <li>🚊 Transit lover</li>
            <li>🌱 Smoliv fan</li>
          </ul>
        </div>
      </div>
      <h2>Collection</h2>
      <p>In 2023, I began making a concerted effort to collect a transit card from every city I visited. As a public transit enthusiast I love immersing myself in cities with excellent transit networks, though I have also found the challenge of obtaining cards from cities in which transit is less of a priority to be fun as well.</p>

      <p>As more and more systems allow payment through phone taps or credit cards, the future of transit card collecting is uncertain. While this technology is undeniably more convenient for many users, I'll always have a soft spot for the system-specific cards!</p>
      <h2>Ranking Criteria</h2>
      <p>From a design perspective, I value clear, distinctive iconography. I think it's especially fun when cards find a unique way to tie into the region they represent. I want a card to be something I enjoy seeing every time I open my wallet. In transit systems, I prize access to a wide range of destinations, ease of use, reliability, and safety.</p>
      <p>Please keep in mind that these ratings are based on my own experiences and opinions. If a system is not as highly rated as you think it should be, it's probably because I have not yet had the opportunity to experience it enough!</p>
      <h2>Contact</h2>
      <a href="mailto:isaac.cinquini@gmail.com">
        <div className="contact-row">
          <IoMail />
          <span>isaac.cinquini@gmail.com</span>
        </div>
      </a>
      <a href="https://www.linkedin.com/in/zackcinquini">
        <div className="contact-row">
          <IoLogoLinkedin />
          <span>linkedin.com/in/zackcinquini</span>
        </div>
      </a>
      <a href="https://github.com/zack5">
        <div className="contact-row">
          <IoLogoGithub />
          <span>github.com/zack5</span>
        </div>
      </a>

    </div>
  );
}