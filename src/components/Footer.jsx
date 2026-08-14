import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Hand, Github, Linkedin, Twitter, Dribbble, Mail } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import "./Footer.css";

export default function Footer() {
  useScrollReveal("footer");

  const [timeString, setTimeString] = useState("");
  const footerRef = useRef(null);
  const footerInnerRef = useRef(null);

  // Parallax Scroll Unraveling Effect
  useEffect(() => {
    const handleScroll = () => {
      if (!footerRef.current || !footerInnerRef.current) return;
      const rect = footerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight) {
        // Calculate unraveling progress
        const totalHeight = rect.height || windowHeight;
        const progress = Math.min(1, Math.max(0, (windowHeight - rect.top) / totalHeight));
        // Unravel translate from -140px up to 0px
        const translateY = (1 - progress) * -140;
        footerInnerRef.current.style.transform = `translate3d(0, ${translateY}px, 0)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Live West Africa Time (WAT / Lagos / Nigeria) Ticker
  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: "Africa/Lagos",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      const formatted = new Intl.DateTimeFormat("en-US", options).format(new Date());
      setTimeString(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="global-footer" id="contact" ref={footerRef}>
      <div className="footer-container" ref={footerInnerRef}>
        {/* Combined Compact Main Row (CTA Left, Status & Connect Right) */}
        <div className="footer-main-row reveal-on-scroll">
          {/* Left Column: Hero CTA */}
          <div className="footer-left-cta">
            <span className="footer-cta-sub">GOT A PROJECT IN MIND?</span>
            <h2 className="footer-cta-title">
              Let's work <br />
              together.
            </h2>

            <div className="footer-action-row">
              <a href="mailto:emekaokoro281@gmail.com" className="btn-footer-touch">
                <span>emekaokoro281@gmail.com</span>
                <div className="badge-icon">
                  <ArrowUpRight size={22} />
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Status & Social Connections */}
          <div className="footer-right-info">
            <div className="footer-info-block">
              <span className="col-label">STATUS &amp; LOCATION</span>
              <div className="status-pill">
                <span className="pulse-dot"></span>
                <span>Available for freelance projects</span>
              </div>
              <div className="time-display">
                <span>Nigeria (WAT) — {timeString || "07:52 PM"}</span>
              </div>
            </div>

            <div className="footer-info-block">
              <span className="col-label">CONNECT</span>
              <ul className="footer-social-links">
                <li>
                  <a href="https://github.com/FrontEndDoctor" target="_blank" rel="noopener noreferrer">
                    <span>GitHub</span>
                    <ArrowUpRight size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://x.com/Rich_ard234" target="_blank" rel="noopener noreferrer">
                    <span>Twitter / X</span>
                    <ArrowUpRight size={14} />
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/2348141761151" target="_blank" rel="noopener noreferrer">
                    <span>WhatsApp</span>
                    <ArrowUpRight size={14} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="footer-bottom-bar">
          <span className="copyright-text">
            © {new Date().getFullYear()} Emeka (FrontEndDoctor) — All rights reserved.
          </span>
          <span className="built-text">
            Designed &amp; Developed by Emeka ✦ React &amp; Vite
          </span>
        </div>
      </div>
    </footer>
  );
}
