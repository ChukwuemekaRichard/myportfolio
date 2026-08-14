import React from "react";
import "./Hero.css";
import { ArrowDownRight, Globe } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero-section" id="top">
      {/* Top Bar: Status & Location */}
      <div className="hero-top-bar">
        <div className="status-badge">
          <span className="status-dot"></span>
          <span>Available for new projects</span>
        </div>

        <div className="location-badge">
          <Globe size={15} />
          <span>Nigeria & Remote Worldwide</span>
        </div>
      </div>

      {/* Main Hero Bottom Grid */}
      <div className="hero-bottom-grid">
        {/* Big Text Left Bottom */}
        <div className="hero-title-container">
          <h1 className="hero-main-title">
            Freelance <br />
            Designer &amp; Developer
          </h1>
        </div>

        {/* Small Intro Box Right Bottom */}
        <div className="hero-intro-box">
          <div className="intro-arrow">
            <ArrowDownRight size={28} />
          </div>
          <p className="hero-intro-text">
            Crafting high-performance web applications, intuitive user interfaces, and dynamic digital experiences that elevate modern brands.
          </p>
          <div className="hero-tags">
            <span className="hero-tag">UI/UX Design</span>
            <span className="hero-tag">Frontend &amp; Fullstack</span>
          </div>
        </div>
      </div>
    </section>
  );
}
