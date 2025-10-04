import { useState, useEffect, useRef } from "react";
import "./App.css";
import { gsap } from "gsap";
import mainLogo from "./assets/fulllog2.png";
import me2 from "./assets/me2.png";
import ApwenFarm from "./assets/apwenfarm.png";
import Bansoga from "./assets/Home.png"
import Vbot from "./assets/Vbot.png"
import vite from "./assets/vite.jpg"
import gaze from "./assets/gaze.png"
import npjBaner from "./assets/npj-banner2.png"
import singleLogo from "./assets/mainlogo.png"

import OnePlug from "./assets/oneplugTemplate.png";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowDown01, ArrowDownCircle, ArrowUp, Badge, BadgeCheck, Briefcase, ChevronDown, Grid2X2Icon, Home, List, Mail, Menu, Plane, Quote, Send, Twitter, User } from "lucide-react";
import Lenis from "@studio-freight/lenis";
import { LuPiggyBank } from "react-icons/lu";
import { Link } from "react-router-dom";
import Card from "./components/stack";
import ElectricStackBubbles from "./components/glowcard";
import { FaGithub, FaTwitter, FaLinkedin, FaPinterest, FaInstagram, FaWhatsapp, FaReact, FaFigma, FaCss3, FaHtml5 } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RiNextjsFill } from "react-icons/ri";
import { PiPaperPlane } from "react-icons/pi";
import CustomCursor from "./components/custom-cursor";

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  const [currentTime, setCurrentTime] = useState("");
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const heroRef = useRef(null);
  const [isclicked, setIsClicked] = useState(false);
  const lenisRef = useRef(null);
  const leftTopRef = useRef(null);
  const rightBottomRef = useRef(null);
  const [ListStyle, setListStyle] = useState(true);

  // First useEffect - Lenis initialization
  useEffect(() => {
    // Detect mobile devices
    const isMobile = window.innerWidth <= 768;

    // Initialize Lenis with mobile-specific settings
    const lenis = new Lenis({
      duration: isMobile ? 0.8 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: !isMobile, // Disable smooth scroll on mobile
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Connect Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Handle scroll events for navbar and scroll-following elements
    const handleScroll = () => {
      if (!heroRef.current) return;
      const heroBottom = heroRef.current.getBoundingClientRect().bottom;
      setIsScrolledPastHero(heroBottom < 90);

      // Apply scroll-following transform to elements
      const currentScrollY = window.scrollY;
      if (leftTopRef.current && rightBottomRef.current) {
        const scrollSpeed = currentScrollY * 1;
        leftTopRef.current.style.transform = `translateY(-${scrollSpeed}px)`;
        rightBottomRef.current.style.transform = `translateY(-${scrollSpeed}px)`;
      }
    };

    lenis.on("scroll", handleScroll);

    return () => {
      lenis.destroy();
      gsap.ticker.remove();
    };
  }, []);

  function ToggleMenu() {
    setIsClicked(!isclicked);
  }

  // Smooth scroll to section when nav links are clicked
  const scrollToSection = (targetId) => {
    if (lenisRef.current) {
      const target = document.querySelector(targetId);
      if (target) {
        lenisRef.current.scrollTo(target, {
          offset: -80,
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      }
    }
    setIsClicked(false);
  };

  // Refs for GSAP animations
  const heroTitleRef = useRef(null);
  const projectItemsRef = useRef([]);
  const aboutSectionRef = useRef(null);
  const contactSectionRef = useRef(null);

  // Second useEffect - Time updates and GSAP animations
  useEffect(() => {
    // Time update
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Africa/Lagos",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    // GSAP animations with ScrollTrigger
    projectItemsRef.current.forEach((item, index) => {
      if (item) {
        gsap.from(item, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }
    });

    // About section animation
    if (aboutSectionRef.current) {
      gsap.from(aboutSectionRef.current.children, {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        scrollTrigger: {
          trigger: aboutSectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    }

    // Contact section animation
    if (contactSectionRef.current) {
      gsap.from(contactSectionRef.current.children, {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        scrollTrigger: {
          trigger: contactSectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    }

    // Cleanup
    return () => {
      clearInterval(timer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const projects = [
    {
      title: "FARM MANAGEMENT SYSTEM",
      year: "2025",
      type: "FRONT END",
      status: "COMPLETED",
      image: ApwenFarm,
      name: "Apwen Farm",
      link: "https://cloneapwenrr.vercel.app",
      stack: [
        {
          name: "React",
          Icon: <FaReact color="#61DAFB" size={24} />,
        },
        {
          name: "Figma",
          Icon: <FaFigma color="#F24E1E" size={24} />,
        },
        {
          name: "css",
          Icon: <FaCss3 color="#1572B6" size={24} />,
        },
      ]
    },
    {
      title: "GAMING ACCOUNT MARKETPLACE",
      year: "2024",
      type: "FRONT END",
      status: "LIVE",
      image: Bansoga,
      name: "Bansonga",
      link: "https://www.bansonga.com/",
      stack: [
        {
          name: "React",
          Icon: <FaReact color="#61DAFB" size={24} />,
        },
        {
          name: "Figma",
          Icon: <FaFigma color="#F24E1E" size={24} />,
        },
        {
          name: "css",
          Icon: <FaCss3 color="#1572B6" size={24} />,
        },
        {
          name: "Next.js",
          Icon: <RiNextjsFill color="#000000" size={24} />
        }
      ]
    },
    {
      title: "One Plug ECOMMERCE TEMPLATE",
      year: "2023",
      type: "FRONTEND/UI",
      status: "LIVE",
      image: OnePlug,
      name: "One Plug",
      link: "https://onetest-001.netlify.app/",
      stack: [
        {
          name: "React",
          Icon: <FaReact color="#61DAFB" size={24} />,
        },
        {
          name: "Figma",
          Icon: <FaFigma color="#F24E1E" size={24} />,
        },
        {
          name: "css",
          Icon: <FaCss3 color="#1572B6" size={24} />,
        }
      ]
    },

    {
      title: "FOREX TRADING BOT MARKETPLACE",
      year: "2023",
      type: "FRONTEND",
      status: "LIVE",
      image: Vbot,
      name: "Vbot",
      link: "https://vftbotmart.com/home/",
      stack: [
        {
          name: "React",
          Icon: <FaReact color="#61DAFB" size={24} />,
        },
        {
          name: "Figma",
          Icon: <FaFigma color="#F24E1E" size={24} />,
        },
        {
          name: "css",
          Icon: <FaCss3 color="#1572B6" size={24} />,
        }
      ]
    },
    {
      title: "YOUR PROJECT HERE",
      year: "2025?",
      type: "FRONTEND? OR UI/UX DESIGN?",
      status: "COMING SOON 🔥 ",
      image: npjBaner,
      name: "YOUR PROJECT 🫣",
      link: "#",
      stack: [
        {
          name: "REACT?",
          Icon: <FaReact color="#ccc" size={24} />,
        },
        {
          name: "FIGMA?",
          Icon: <FaFigma color="#ccc" size={24} />,
        }
      ]

    },
  ];

  return (
    <div className="portfolio-container">
      <div className="grid"></div>
      <CustomCursor />

      <nav className="nav">
        <div className="nav-inner">
          <div className="logo">
            {window.innerWidth < 780 ? (
              <img src={singleLogo} alt="Logo" />
            ) : (
              <img src={mainLogo} alt="Logo" />
            )}
          </div>
{/* 
          <div className="nav-scroled ">
            <a
              href="#"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("body");
              }}
            >
              Home
            </a>
            <a
              href="#work"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#work");
              }}
            >
              Projects
            </a>
            <a
              href="#about"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#about");
              }}
            >
              About
            </a>
            <a
              href="#contact"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#contact");
              }}
            >
              Contact ME
            </a>
          </div> */}

          <div className="close-btn">
            <div className="card-glow cyan"></div>
            <button>Download CV</button>
            <ArrowDownCircle />
          </div>
        </div>
      </nav>
      <div className="hero-2">
        <div className="absolut-emg">
          <img src={gaze} alt="" />
        </div>
        <div className="left-h2">
          <p>hi 👋 i'm Chukwuemeka</p>
          <h1>Design and </h1>
          <h1>Code Beautiful</h1>
          <button className="talk-button">
            <div className="card-glow cyan"></div>
            Let's Talk <Send />
          </button>
        </div>
        <div className="right-hero-buttom">
          <div className="stats-row">
            <div className="stat">
              <span className="stat-number">5+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat">
              <span className="stat-number">20+</span>
              <span className="stat-label">Completed Projects</span>
            </div>
            <div className="stat">
              <span className="stat-number">10+</span>
              <span className="stat-label">Happy Clients</span>
            </div>
          </div>

        </div>

      </div>
      <section className="welcome-section">
        <div className="welcome-container">
          <div className="welcome-avatar">
            {/* <div className="avatar-glow"></div> */}
            <img src={me2} alt="Chukwuemeka" />
            <div className="sparkles">
              <span className="sparkle">✦</span>
              <span className="sparkle">✦</span>
              <span className="sparkle">✦</span>
            </div>
          </div>

          <div className="welcome-content">
            <div className="animated-text-wrapper">
              {/* Selection Box */}
              <div className="selection-box">
                <div className="corner top-left"></div>
                <div className="corner top-right"></div>
                <div className="corner bottom-left"></div>
                <div className="corner bottom-right"></div>
              </div>

              {/* Animated Cursor */}
              <div className="animated-cursor">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 3L3 21L12 16L16.5 18L20.5 22L5 3Z"
                    fill="#02AAB0"
                    stroke="white"
                    strokeWidth="1"
                  />
                </svg>
                <div className="cursor-label">Chukwuemeka</div>
              </div>

              <h2 className="welcome-greeting">Hey, I'm Chukwuemeka.</h2>
            </div>

            <p className="welcome-intro">
              I create premium websites for ambitious, design-driven people.
            </p>

            <p className="welcome-description">
              Wielding world-class React development and robust, elegant code,
              I captivate audiences with intuitive interfaces, seamless animations,
              and pixel-perfect designs.
            </p>

            <p className="welcome-detail">
              I focus on the details so that you don't have to, offering collaborative
              development throughout the project and beyond. In short, I am a
              multidisciplinary frontend developer who brings ideas to life.
            </p>
          </div>
        </div>
      </section>
      <div className="about-section">

      </div>
      <section id="work" className="projects-section">
        <div className="header-filter">
          <h2 className="section-title a">Checkout Some Of My Work</h2>
          <div className="background-text">
            <h2>Live Projects</h2>
          </div>
        </div>
        <div className={`project-grid ${ListStyle ? "" : "grid"}`}>
          {projects.map((project, index) => (
            <Link to={project.link} key={index} className="project-item ">
              <div className="first-project">
                <div className="project-image">
                  <img src={project.image} alt="" />
                </div>
                <div className="project-details">
                  <div className="project-title">{project.title}</div>
                  <div className="project-meta">
                    <span>{project.year}</span>
                    <span>{project.type}</span>
                  </div>
                  <div className="project-stack">
                    {project.stack.map((tech, i) => (
                      <span key={i} className="tech-stack">
                        {tech.Icon} {tech.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="project-status">{project.status}</div>
              <div className="project-visit">
                <div className="main-pjvisit">
                  <span>Visit Site</span>
                  <ArrowUp size={24} className="ttspan" />
                </div>
              </div>
              <div className="project-name">
                <span>{project.name
                }
                  <div className="card-glow cyan"></div></span>

              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="letswork">

        <div className="left-lw">
          <div className="lets-work">
            <h2>Let's Work Together</h2>
            <p>I'm available for freelance projects. Let's create something amazing together!</p>
            <button className="talk-button">
              <div className="card-glow cyan"></div>
              Hire Me <PiPaperPlane />
            </button>

          </div>


        </div>
        <div className="right-lw">
          
        </div>


      </section>
      <div className="footer-main">
      

      </div>

    </div>
  );
}