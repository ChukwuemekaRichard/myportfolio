import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import "./App.css";
import { Sun, Moon, Hand, Menu, X } from "lucide-react";
import Lenis from "lenis";
import Preloader from "./components/Preloader";
import ScrollToTop from "./components/ScrollToTop";
import Hero from "./components/Hero";
import ScrollTextMarquee from "./components/ScrollTextMarquee";
import Gallery3D from "./components/Gallery3D";
import ServiceBuilder from "./components/ServiceBuilder";
import Footer from "./components/Footer";
import WorkPage from "./pages/Work";
import ProjectDetail from "./pages/ProjectDetail";
import AboutPage from "./pages/About";
import ServicesPage from "./pages/Services";

import avatarFocused from "./assets/avatar_focused.png";
import FloatingAvatar from "./components/FloatingAvatar";

function HomeView() {
  return (
    <>
      <Hero />
      <ScrollTextMarquee />
      <Gallery3D />
      <ServiceBuilder />
    </>
  );
}

const getPreloaderWords = (pathname) => {
  if (pathname.startsWith("/work/")) {
    const rawSlug = pathname.split("/work/")[1] || "Case Study";
    const formattedSlug = rawSlug.replace("-", " ").toUpperCase();
    return ["Project", formattedSlug, "Case Study", "Selected Work"];
  }
  if (pathname === "/work") {
    return ["Work", "Selected Work", "Portfolio Showcase", "Case Studies"];
  }
  if (pathname === "/services") {
    return ["Services", "UI/UX Design", "Frontend Engineering", "Solutions"];
  }
  if (pathname === "/about") {
    return ["About", "Biography", "Capabilities", "Experience"];
  }
  return ["Hello", "Welcome", "Emeka Portfolio", "Designer & Developer"];
};

export default function Portfolio() {
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);
  const [loaderKey, setLoaderKey] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lenisRef = useRef(null);

  // Dark Mode Theme State with LocalStorage Persistence
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("emeka_portfolio_theme");
    if (savedTheme) return savedTheme;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("emeka_portfolio_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Close mobile menu and reset scroll whenever route path changes
  useEffect(() => {
    setIsLoaded(false);
    setIsMobileMenuOpen(false);
    setLoaderKey((prev) => prev + 1);

    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [location.pathname]);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    });

    lenisRef.current = lenis;
    let animationFrameId;

    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <div className={`portfolio-app ${isLoaded ? "page-ready" : "page-loading"}`}>
      {/* Scroll Reset Component on Route Navigation */}
      <ScrollToTop />

      {/* Fullscreen Curtain Preloader with dynamic route transition key */}
      <Preloader
        key={loaderKey}
        words={getPreloaderWords(location.pathname)}
        onComplete={() => setIsLoaded(true)}
      />

      {/* Navbar matching reference design */}
      <nav className={`navbar ${isMobileMenuOpen ? "mobile-menu-active" : ""}`}>
        <Link to="/" className="nav-brand" onClick={() => setIsMobileMenuOpen(false)} title="Emeka Portfolio">
          <div className="nav-brand-avatar">
            <img src={avatarFocused} alt="Emeka Logo" className="nav-brand-img" />
          </div>
        </Link>

        {/* Right Section: Nav Items followed by Action Buttons */}
        <div className={`nav-right ${isMobileMenuOpen ? "is-open" : ""}`}>
          <ul className="nav-links">
            <li>
              <Link to="/work" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                Work
              </Link>
            </li>
            <li>
              <Link to="/services" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                Services
              </Link>
            </li>
            <li>
              <Link to="/about" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                About
              </Link>
            </li>
          </ul>

          <div className="nav-actions">
            <a
              href="https://wa.me/2348141761151"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-get-in-touch"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>Get in touch</span>
              <div className="badge-icon">
                <Hand size={18} />
              </div>
            </a>

            <button
              onClick={toggleTheme}
              className="btn-icon-circle theme-toggle-btn"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Hamburger Button (Only visible on mobile screens <= 768px) */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="btn-icon-circle mobile-hamburger-btn"
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Floating Hover-Swap Avatar Widget */}
      <FloatingAvatar />

      {/* Main Content View Container with Uncovering Coverture Page Wrapper */}
      <main className="main-content">
        <div className="page-content-wrapper">
          {/* Page Content View Container */}
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/work/:slug" element={<ProjectDetail />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>

          {/* Seamless Liquid Extension Curve in Page Color */}
          <div className="page-curve-extension">
            <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="page-curve-svg">
              <path
                d="M 0,0 L 1440,0 L 1440,20 Q 720,120 0,20 Z"
                fill={theme === "dark" ? "#0d0d0d" : "#f7f5f0"}
              />
            </svg>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
}