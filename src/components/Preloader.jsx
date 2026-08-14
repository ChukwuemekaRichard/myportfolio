import React, { useEffect, useState } from "react";
import "./Preloader.css";

export default function Preloader({ onComplete, words = ["Hello", "Welcome", "Emeka Portfolio", "Designer & Developer"] }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [isSlidingUp, setIsSlidingUp] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Cycle words smoothly in the center
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => {
        if (prev < words.length - 1) return prev + 1;
        clearInterval(wordInterval);
        return prev;
      });
    }, 300);

    // Trigger curtain liquid slide-up exit
    const timer = setTimeout(() => {
      setIsSlidingUp(true);
    }, 1400);

    // Remove preloader from DOM after sweep ends
    const endTimer = setTimeout(() => {
      setIsHidden(true);
      if (onComplete) onComplete();
    }, 2200);

    return () => {
      clearInterval(wordInterval);
      clearTimeout(timer);
      clearTimeout(endTimer);
    };
  }, [onComplete, words]);

  if (isHidden) return null;

  return (
    <div className={`preloader-overlay ${isSlidingUp ? "slide-up" : ""}`}>
      <div className="preloader-content">
        <div className="preloader-word-wrapper">
          <span className="preloader-dot"></span>
          <h1 className="preloader-text">{words[wordIndex]}</h1>
        </div>
      </div>

      {/* Fluid Organic Curved SVG Edge */}
      <svg className="preloader-curve-svg" viewBox="0 0 1440 300" preserveAspectRatio="none">
        <path
          className="preloader-curve-path"
          d="M 0,0 L 1440,0 L 1440,10 Q 720,280 0,10 Z"
        />
      </svg>
    </div>
  );
}
