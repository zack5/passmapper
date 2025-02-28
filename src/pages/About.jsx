import { IoMail, IoLogoLinkedin, IoLogoGithub } from "react-icons/io5";

import zack from "/assets/zack.jpg";
import pokeball from "/assets/pokeball.jpg";

export default function About() {
  return (
    <div className="about-page-container">
      <h1>
        About
      </h1>
      <div className="about-me-container">
        <img src={zack} alt="Zack Cinquini" className="my-image"/>
        <div className="about-me-text">
          <h2>Zack Cinquini</h2>
          <ul>
            <li>
              <span>👨‍💻</span>
              <span>Software engineer</span>
            </li>
            <li>
              <span>🚊</span>
              <span>Transit lover</span>
            </li>
            <li>
              <img style={{width: "1rem", height: "1rem"}} src={pokeball} alt="Pokeball"/>
              <span>Smoliv fan</span>
            </li>
          </ul>
        </div>
      </div>
      <h2>Collection</h2>
      
      <p>In 2023, I began making a concerted effort to collect a transit card from every city I visited. As a public transit enthusiast I love immersing myself in cities with excellent transit networks, though I have also found the challenge of obtaining cards from cities in which transit is less of a priority to be fun as well!</p>

      <p>As more and more systems allow payment through phone taps or credit cards, the future of transit card collecting is uncertain. While this technology is undeniably more convenient for many users, I'll always have a soft spot for the system-specific cards :)</p>
      
      <h2>Ranking Criteria</h2>
      
      <p>From a design perspective, I value clear, distinctive iconography. I think it's especially fun when cards find a unique way to tie into the region they represent. I want a card to be something I enjoy seeing every time I open my wallet. In transit systems, I prize access to a wide range of destinations, ease of use, reliability, and safety.</p>
      
      <p>Please keep in mind that these ratings are based on my own experiences and opinions! The fact that a region has created a bespoke transit card is itself a testament to its committment to transit. If I have given a system a lower score than you think it deserves, I likely have not had the opportunity to experience it enough.</p>
      
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