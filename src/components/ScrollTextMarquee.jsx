import React, { useEffect, useRef } from "react";
import "./ScrollTextMarquee.css";

export default function ScrollTextMarquee() {
  const marqueeRef = useRef(null);

  useEffect(() => {
    let animationFrameId;
    let basePos = 0;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (marqueeRef.current) {
        // Translate marquee relative to scroll position for velocity movement
        marqueeRef.current.style.transform = `translate3d(-${(scrollY * 0.35) % 1200}px, 0, 0)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const marqueeContent = "DESIGNER  ✦  DEVELOPER  ✦  CREATIVE FRONTEND  ✦  UI/UX EXPERT  ✦  FULLSTACK ARCHITECT  ✦  ";

  return (
    <div className="marquee-section-container">
      <div className="marquee-track" ref={marqueeRef}>
        <span className="marquee-text-item">{marqueeContent}</span>
        <span className="marquee-text-item">{marqueeContent}</span>
        <span className="marquee-text-item">{marqueeContent}</span>
      </div>
    </div>
  );
}
