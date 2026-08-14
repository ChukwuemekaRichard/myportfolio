import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, Code, Layout, Users, Sparkles } from "lucide-react";
import meProfile from "../assets/me2.png";
import gazeImg from "../assets/gaze.png";
import npjImg from "../assets/npj-banner2.png";
import chessImg from "../assets/chess.jpg";
import rubiksImg from "../assets/rubicks cube.jpg";
import tableTennisImg from "../assets/table_tennis.png";
import { useScrollReveal } from "../hooks/useScrollReveal";
import "./About.css";

const hobbiesData = [
  {
    id: 0,
    title: "Chess",
    badge: "2100 ELO CHESS PLAYER",
    image: chessImg,
    leftStatements: [
      "RATED 2100 ELO CHESS PLAYER",
      "DEEP TACTICAL PATTERN RECOGNITION",
      "CALCULATED POSITIONING & STRATEGY",
      "CALM UNDER TIME PRESSURE",
    ],
    rightStatements: [
      "MASTERY OF COMPLEX ENDGAME POSITIONING",
      "OUTMANEUVERING UNPREDICTABLE SCENARIOS",
      "LONG-TERM STRATEGIC FORESIGHT",
    ],
  },
  {
    id: 1,
    title: "Rubik's Cube",
    badge: "3X3 & 4X4 SPEEDSOLVER",
    image: rubiksImg,
    leftStatements: [
      "SOLVING BOTH 3X3 AND 4X4 CUBES",
      "FAST ALGORITHMIC MEMORY & EXECUTION",
      "SPATIAL AWARENESS & DISCIPLINE",
      "OPTIMIZING STEP-BY-STEP EFFICIENCY",
    ],
    rightStatements: [
      "RESOLVING PARITY & PERMUTATION PROBLEMS",
      "HIGH-SPEED HAND-EYE COORDINATION",
      "BREAKING DOWN COMPLEXITY INTO ALGORITHMS",
    ],
  },
  {
    id: 2,
    title: "Table Tennis",
    badge: "FAST REFLEXES & RHYTHM",
    image: tableTennisImg,
    leftStatements: [
      "LIGHTNING FAST REFLEXES & SPEED",
      "SPIN CONTROL & RHYTHM IN RALLIES",
      "HAND-EYE COORDINATION & AGILITY",
      "PRECISION PLACEMENT UNDER PRESSURE",
    ],
    rightStatements: [
      "INSTANT DECISION MAKING IN COMBAT",
      "READING OPPONENT SERVES & ANGLING",
      "HIGH-INTENSITY FOCUS & FLUID MOTION",
    ],
  },
  {
    id: 3,
    title: "Mentorship & Code",
    badge: "INFORMAL TEACHING",
    image: meProfile,
    leftStatements: [
      "INFORMAL FRONTEND MENTORSHIP",
      "TEACHING HTML, CSS & REACT FUNDAMENTALS",
      "BREAKING DOWN DIFFICULT TECH CONCEPTS",
      "BUILDING CONFIDENCE FOR NEW DEVELOPERS",
    ],
    rightStatements: [
      "EMPOWERING ASPIRING FRONTEND ENGINEERS",
      "COMMUNITY CODE REVIEWS & BEST PRACTICES",
      "SIMPLIFYING TECHNICAL DOCUMENTATION",
    ],
  },
];

export default function AboutPage() {
  useScrollReveal("about");
  const [activeHobby, setActiveHobby] = useState(0);

  const capabilities = [
    {
      category: "UI/UX & Product Design",
      icon: <Layout size={26} />,
      items: [
        "Figma Wireframes & Prototypes",
        "Design Systems & Token Architecture",
        "User Experience & Journey Mapping",
        "Fintech, Agritech & E-commerce UI",
        "Micro-Interactions & Prototyping",
      ],
    },
    {
      category: "Frontend Engineering",
      icon: <Code size={26} />,
      items: [
        "React 19 & JavaScript (ES6+)",
        "GSAP ScrollTrigger & Motion",
        "Vite & Modern Build Tooling",
        "Responsive & Fluid Layouts",
        "Performance Optimization (60 FPS)",
      ],
    },
    {
      category: "Mentorship & Education",
      icon: <Users size={26} />,
      items: [
        "Informal Web Dev Tutoring",
        "HTML5 & CSS3 Fundamentals",
        "UI Design Principles for Beginners",
        "Frontend Best Practices",
      ],
    },
  ];

  const handleNextHobby = () => {
    setActiveHobby((prev) => (prev + 1) % hobbiesData.length);
  };

  const handlePrevHobby = () => {
    setActiveHobby((prev) => (prev - 1 + hobbiesData.length) % hobbiesData.length);
  };

  return (
    <div className="about-page-container">
      {/* Back Navigation Bar */}
      <div className="about-nav-bar">
        <Link to="/" className="btn-back-home">
          <ArrowLeft size={18} />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Main Hero Header */}
      <header className="about-hero-header reveal-on-scroll">
        <span className="about-hero-tag">MEET EMEKA</span>
        <h1 className="about-hero-title">
          Frontend Developer &amp; <br />
          UI/UX Designer.
        </h1>
      </header>

      {/* Profile Image & Key Highlights */}
      <section className="about-profile-section">
        <div className="about-profile-grid">
          <div className="about-profile-image-frame reveal-on-scroll">
            <img src={meProfile} alt="Emeka Developer Profile" className="about-profile-image" />
          </div>

          <div className="about-stats-column reveal-on-scroll delay-100">
            <div className="stat-card">
              <span className="stat-number">6+</span>
              <span className="stat-label">Years of Experience</span>
            </div>

            <div className="stat-card">
              <span className="stat-number">400L</span>
              <span className="stat-label">Electrical Engineering Student</span>
            </div>

            <div className="stat-card">
              <span className="stat-number">4</span>
              <span className="stat-label">Core Industries (Fintech, Agritech, Healthtech, E-commerce)</span>
            </div>
          </div>
        </div>

        {/* Narrative Biography */}
        <div className="about-narrative-box reveal-on-scroll">
          <h2 className="narrative-heading">Background &amp; Story</h2>
          <p className="narrative-lead">
            Emeka Okoro (known online as <strong>FrontEndDoctor</strong>) is a frontend developer and UI/UX designer with about 6 years of experience building digital products across fintech, agritech, healthtech, and e-commerce. He works across the full product cycle — from Figma wireframes and design systems to shipped, production-ready interfaces — and has led design and development on projects like Emburse, a fintech app combining escrow with crypto-to-Naira conversion.
          </p>
          <p className="narrative-text">
            Alongside client and freelance work, Emeka is a 400-level electrical engineering student, giving him a technical grounding that shapes how he approaches problem-solving in software. He also teaches front-end development informally, helping newcomers get comfortable with HTML, CSS, and the fundamentals of building for the web.
          </p>
        </div>
      </section>

      {/* Interactive Visual Showcase Banner */}
      <section className="about-visual-banner reveal-on-scroll">
        <div className="banner-img-box">
          <img src={npjImg} alt="Work preview" className="banner-img" />
        </div>
        <div className="banner-img-box">
          <img src={gazeImg} alt="Design preview" className="banner-img" />
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="about-skills-section">
        <div className="skills-header reveal-on-scroll">
          <span className="section-label">WHAT I DO</span>
          <h2 className="section-title">Core Skills &amp; Capabilities</h2>
        </div>

        <div className="skills-grid">
          {capabilities.map((cap) => (
            <div className="skill-card reveal-on-scroll" key={cap.category}>
              <div className="skill-icon-badge">{cap.icon}</div>
              <h3 className="skill-card-title">{cap.category}</h3>
              <ul className="skill-card-list">
                {cap.items.map((item) => (
                  <li key={item}>
                    <Sparkles size={14} className="sparkle-icon" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Hobbies & Beyond Work Showcase Section */}
      <section className="about-hobbies-section">
        <div className="hobbies-header reveal-on-scroll">
          <span className="section-label">BEYOND THE SCREEN</span>
          <h2 className="section-title">Hobbies &amp; Personal Interests</h2>
        </div>

        <div className="hobbies-deck-showcase reveal-on-scroll">
          {/* Left Statements */}
          <div className="hobby-side-col left-col">
            {hobbiesData[activeHobby].leftStatements.map((text, idx) => (
              <div className="hobby-statement-item" key={idx}>
                <p>{text}</p>
              </div>
            ))}
          </div>

          {/* Center Photo Deck */}
          <div className="hobby-deck-center">
            <div className="hobby-card-stack" onClick={handleNextHobby} title="Click to view next hobby">
              {hobbiesData.map((hobby, index) => {
                const position = (index - activeHobby + hobbiesData.length) % hobbiesData.length;
                return (
                  <div
                    key={hobby.id}
                    className={`stacked-photo-card card-pos-${position}`}
                    style={{
                      zIndex: hobbiesData.length - position,
                    }}
                  >
                    <img src={hobby.image} alt={hobby.title} className="stacked-photo-img" />
                    <div className="stacked-photo-badge">
                      <span>{hobby.badge}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Slide Indicator & Nav */}
            <div className="hobby-controls">
              <button onClick={handlePrevHobby} className="btn-hobby-nav" aria-label="Previous hobby">
                <ArrowLeft size={18} />
              </button>
              <span className="hobby-counter">0{activeHobby + 1} / 0{hobbiesData.length}</span>
              <button onClick={handleNextHobby} className="btn-hobby-nav" aria-label="Next hobby">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Right Statements */}
          <div className="hobby-side-col right-col">
            {hobbiesData[activeHobby].rightStatements.map((text, idx) => (
              <div className="hobby-statement-item" key={idx}>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="about-footer-cta reveal-on-scroll">
        <h2>Want to work together or discuss a project?</h2>
        <a href="mailto:emekaokoro281@gmail.com" className="btn-get-in-touch">
          <span>Let's talk</span>
          <div className="badge-icon">
            <ArrowUpRight size={18} />
          </div>
        </a>
      </footer>
    </div>
  );
}
