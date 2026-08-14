import React, { useState, useEffect, useRef } from "react";
import "./Gallery3D.css";
import { ArrowUpRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { projectsData } from "../data/projectsData";

export default function Gallery3D() {
  const sectionRef = useRef(null);
  const modalRef = useRef(null);
  const cursorLabelRef = useRef(null);

  const [activeFilter, setActiveFilter] = useState("all");
  const [activeProject, setActiveProject] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  // Filter projects by active tab
  const filteredProjects = projectsData.filter((p) => {
    if (activeFilter === "all") return true;
    return p.type === activeFilter;
  });

  // Enable scroll reveal fade-in animations for headers
  useScrollReveal(activeFilter);

  // Mouse physics tracking state
  const mousePos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const animationFrame = useRef(null);

  // Track mouse coordinates relative to section bounds
  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mousePos.current = { x, y };
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setActiveProject(null);
  };

  // Smooth lerp physics for cursor-following preview card
  useEffect(() => {
    let lastX = currentPos.current.x;
    let lastY = currentPos.current.y;

    const animate = () => {
      // Lerp positions (0.12 smooth inertia factor)
      const lerpFactor = 0.12;
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * lerpFactor;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * lerpFactor;

      // Calculate velocity for subtle rotation tilt effect
      velocity.current.x = currentPos.current.x - lastX;
      velocity.current.y = currentPos.current.y - lastY;
      lastX = currentPos.current.x;
      lastY = currentPos.current.y;

      const tilt = Math.max(Math.min(velocity.current.x * 0.2, 12), -12);

      if (modalRef.current) {
        modalRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) translate(-50%, -50%) rotate(${tilt}deg)`;
      }

      if (cursorLabelRef.current) {
        cursorLabelRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrame.current = requestAnimationFrame(animate);
    };

    animationFrame.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  const activeIndex = activeProject !== null ? activeProject : 0;

  return (
    <section
      className="minimalist-gallery-section"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      id="work"
    >
      {/* Top Header Area */}
      <div className="gallery-header-row reveal-on-scroll">
        <div className="gallery-header-left">
          <span className="recent-work-tag">RECENT WORK</span>
          <h2 className="gallery-section-title">Some of my latest works</h2>
        </div>

        <div className="gallery-header-right">
          {/* Category Toggle Tabs */}
          <div className="filter-tabs">
            <button
              className={`filter-tab-btn ${activeFilter === "all" ? "is-active" : ""}`}
              onClick={() => {
                setActiveFilter("all");
                setActiveProject(null);
              }}
            >
              All Works
            </button>
            <button
              className={`filter-tab-btn ${activeFilter === "ui" ? "is-active" : ""}`}
              onClick={() => {
                setActiveFilter("ui");
                setActiveProject(null);
              }}
            >
              UI / UX
            </button>
            <button
              className={`filter-tab-btn ${activeFilter === "web" ? "is-active" : ""}`}
              onClick={() => {
                setActiveFilter("web");
                setActiveProject(null);
              }}
            >
              Web Dev
            </button>
          </div>
        </div>
      </div>

      {/* Works List */}
      <div
        className="projects-list-container"
        onMouseLeave={() => setActiveProject(null)}
      >
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            className={`project-row ${activeProject === index ? "is-active" : ""}`}
            onClick={() => navigate(`/work/${project.slug}`)}
            onMouseEnter={() => setActiveProject(index)}
            onMouseLeave={() => setActiveProject(null)}
          >
            <div className="project-row-left">
              <h2 className="project-title">{project.title}</h2>
            </div>

            <div className="project-row-right">
              <span className="project-category">{project.category}</span>
            </div>

            {/* Mobile preview inline toggle */}
            <div className="mobile-project-preview">
              <img src={project.image} alt={project.title} loading="lazy" />
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      <div className="gallery-footer-bar">
        <Link to="/work" className="btn-view-more">
          <span>View more work</span>
          <div className="badge-icon">
            <ArrowUpRight size={18} />
          </div>
        </Link>
      </div>


      {/* Floating Image Preview Modal (Follows Cursor) */}
      <div
        ref={modalRef}
        className={`floating-preview-modal ${isHovered && activeProject !== null ? "is-visible" : ""}`}
      >
        <div
          className="floating-preview-slider"
          style={{
            transform: `translateY(-${activeIndex * 100}%)`,
          }}
        >
          {filteredProjects.map((project) => (
            <div
              className="floating-preview-slide"
              key={project.id}
              style={{ backgroundColor: project.bgColor }}
            >
              <div className="floating-preview-img-container">
                <img src={project.image} alt={project.title} className="floating-preview-img" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Badge ("View") */}
      <div
        ref={cursorLabelRef}
        className={`floating-cursor-badge ${isHovered && activeProject !== null ? "is-visible" : ""}`}
      >
        <span>View</span>
      </div>
    </section>
  );
}



