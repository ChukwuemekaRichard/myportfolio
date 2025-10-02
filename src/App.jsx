import { useState, useEffect, useRef } from "react";
import "./App.css";
import { gsap } from "gsap";
import mainLogo from "./assets/fulllog2.png";
import me2 from "./assets/me2.png";
import ApwenFarm from "./assets/apwenfarm.png";
import Bansoga from "./assets/Home.png"
import Vbot from "./assets/Vbot.png"
import vite from "./assets/vite.jpg"
import singleLogo from "./assets/mainlogo.png"

import OnePlug from "./assets/oneplugTemplate.png";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowDown01, ArrowDownCircle, Badge, BadgeCheck, Briefcase, ChevronDown, Grid2X2Icon, Home, List, Mail, Menu, Twitter, User } from "lucide-react";
import Lenis from "@studio-freight/lenis";
import { LuPiggyBank } from "react-icons/lu";
import { Link } from "react-router-dom";
import Card from "./components/stack";
import ElectricStackBubbles from "./components/glowcard";
import { FaGithub, FaTwitter, FaLinkedin, FaPinterest, FaInstagram, FaWhatsapp, FaReact, FaFigma, FaCss3, FaHtml5 } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RiNextjsFill } from "react-icons/ri";

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

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
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
        const scrollSpeed = currentScrollY * 1; // 1:1 ratio for same speed as scroll
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
          offset: -80, // Account for fixed navbar
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      }
    }
    // Close mobile menu after clicking
    setIsClicked(false);
  };

  // Refs for GSAP animations
  const heroTitleRef = useRef(null);
  const projectItemsRef = useRef([]);
  const aboutSectionRef = useRef(null);
  const contactSectionRef = useRef(null);

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
          Icon: <FaReact />,
        },
        {
          name: "Figma",
          Icon: <FaFigma />,
        },
        {
          name: "css",
          Icon: <FaCss3 />,
        },
      ]
    },
    {
      title: "GAMING ACCOUNT MARKETPLACE",
      year: "2024",
      type: "FRONT END",
      status: "COMPLETED",
      image: Bansoga,
      name: "Bansoga",
      link: "bansoga.com",
      stack: [
        {
          name: "React",
          Icon: <FaReact />,
        },
        {
          name: "Figma",
          Icon: <FaFigma />,
        },
        {
          name: "css",
          Icon: <FaCss3 />,
        },
        {
          name: "Next.js",
          Icon: <RiNextjsFill />

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
          Icon: <FaReact />,
        },
        {
          name: "Figma",
          Icon: <FaFigma />,
        },
        {
          name: "css",
          Icon: <FaCss3 />,
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
          Icon: <FaReact />,
        },
        {
          name: "Figma",
          Icon: <FaFigma />,
        },
        {
          name: "css",
          Icon: <FaCss3 />,
        }
      ]
    },
    // {
    //   title: "VIBETBIO",
    //   year: "2025",
    //   type: "FRONT END",
    //   status: "COMPLETED",
    //   image: NewProjectImage,
    //   name: "VibetBio",
    //   link: "https://vibetbio.com",
    //   stack: [
    //     {
    //       name: "React",
    //       Icon: <FaHtml5/>,
    //     },
    //     {
    //       name: "JavaScript",
    //       Icon: <FaJsSquare />,
    //     },
    //     {
    //       name: "css",
    //       Icon: <FaCss3 />,
    //     }
    //   ]
    // }
  ];

  return (
    <div className="portfolio-container">
      <div className="grid">

      </div>

      <nav className="nav">
        <div className="nav-inner">
          <div className="logo">
            {window.innerWidth < 780 ? (
              <img src={singleLogo} alt="Logo" />
            ) : (
              <img src={mainLogo} alt="Logo" />
            )}
          </div>

          <div className="nav-scroled ">
            <a
              href="#"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("body");
              }}
            >
              <Home />
            </a>
            <a
              href="#work"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#work");
              }}
            >
              <Briefcase />
            </a>
            <a
              href="#about"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#about");
              }}
            >
              <User />
            </a>
            <a
              href="#contact"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#contact");
              }}
            >
              <Mail />
            </a>



          </div>
          <div className="close-btn">
            <button>Download CV</button>
            <ArrowDownCircle />

          </div>

        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" ref={heroRef}>

        <div className="hero-text-container">
          <ElectricStackBubbles />
          <div className="text-left">
            <h1>Hi,</h1>
            <h1>I`m Chukwuemeka</h1>
            {/* <p>A front  end dev</p> */}

            <div className="search-bar">
              <input type="email" />
              <button>Email Me </button>
            </div>
            {/* <div className="stack-bubbles">
              <div className="stack-bubble" id="react">
               <FaReact color="#61DAFB" size={70} />
              </div>
              
              <div className="stack-bubble" id="figma">
               <FaFigma color="#F24E1E" size={70}  />
              </div>
            </div> */}

            <div className="social">

              <div className="scl">
                <FaGithub size={24} color=" #40C463" />
                <p>GitHub</p>
                <div className="ball-graident" style={{ background: "#40C463" }}>

                </div>
              </div>
              <div className="scl">
                <FaXTwitter size={20} color="#FFFFFF" />
                <p>Twitter</p>
                <div className="ball-graident" style={{ background: "white" }}>

                </div>
              </div>
              <div className="scl">
                <FaLinkedin size={24} color="#0077B5" />
                <p>LinkedIn</p>
                <div className="ball-graident" style={{ background: "#0077B5" }}>
                </div>
              </div>
              <div className="scl">
                <FaInstagram size={24} color="#E4405F" />
                <p>Instagram</p>
                <div className="ball-graident" style={{ background: "linear-gradient(89deg, #E4405F 0%, #C13584 100%)" }}>

                </div>
              </div>
              <div className="scl">
                <FaWhatsapp size={24} color="#25D366" />
                <p>WhatsApp</p>
                <div className="ball-graident" style={{ background: "#25D366" }}>

                </div>
              </div>

            </div>
          </div>
          <div className="text-right">

          </div>

        </div>
        <div className="hero-abs-2">

        </div>
        <div className="hero-abs4">

        </div>
      </section>
      <section id="work" className="projects-section">
        <div className="header-filter">
          <h2 className="section-title a">Projects</h2>
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
            </Link>
          ))}
        </div>
      </section>
      {/* <section id="about" className="about-section">
        <div>
          <h2 className="section-title d">About</h2>
          <p className="about-text">
            I'm a freelance designer and developer with over 5 years of
            experience creating digital products for startups and established
            companies. I specialize in React development, UI/UX design, and
            brand identity.
          </p>
          <p className="about-text">
            My approach combines strategic thinking with creative execution,
            ensuring every project delivers both aesthetic appeal and functional
            excellence.
          </p>
        </div>
      </section>
      <section>
        <div>
          <h3 className="section-title c">Skills</h3>
          <div className="skills-list">
            <div className="skill">React & Next.js</div>
            <div className="skill">UI/UX Design</div>
            <div className="skill">Brand Identity</div>
            <div className="skill">Frontend Development</div>
            <div className="skill">Figma & Adobe CC</div>
            <div className="skill">Node.js</div>
          </div>
        </div>
      </section> */}

      {/* Contact Section */}
      {/* <section id="contact" className="contact-section">
        <h2 className="contact-title">Let's work together</h2>
        <a href="mailto:hello@yourname.com" className="contact-email">
          hello@yourname.com
        </a>
        <div className="social-links">
          <a href="#" className="social-link">
            LinkedIn
          </a>
          <a href="#" className="social-link">
            Twitter
          </a>
          <a href="#" className="social-link">
            GitHub
          </a>
          <a href="#" className="social-link">
            Dribbble
          </a>
        </div>
      </section> */}
    </div>
  );
}
