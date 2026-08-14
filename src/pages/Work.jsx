import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Work.css";
import { ArrowUpRight, Grid, List, ArrowLeft } from "lucide-react";
import { projectsData } from "../data/projectsData";

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
  const [activeProject, setActiveProject] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const sectionRef = useRef(null);
  const modalRef = useRef(null);
  const cursorLabelRef = useRef(null);

  const mousePos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const animationFrame = useRef(null);

  const filteredProjects = projectsData.filter((p) => {
    if (activeFilter === "all") return true;
    return p.type === activeFilter;
  });

  // Track mouse coordinates for list view hover preview card
  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mousePos.current = { x, y };
  };

  useEffect(() => {
    let lastX = currentPos.current.x;
    let lastY = currentPos.current.y;

    const animate = () => {
      const lerpFactor = 0.12;
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * lerpFactor;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * lerpFactor;

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
    <div className="work-page-container">
      {/* Back to Home Navigation */}
      <div className="work-nav-bar">
        <Link to="/" className="btn-back-home">
          <ArrowLeft size={18} />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Work Page Header */}
      <header className="work-hero-header">
        <span className="work-hero-tag">FEATURED PORTFOLIO</span>
        <h1 className="work-hero-title">
          Selected Work &amp; <br />
          Case Studies
        </h1>
        <p className="work-hero-desc">
          A curated collection of fullstack web applications, UI/UX design systems, and modern interactive products.
        </p>
      </header>

      {/* Filter & View Mode Controls Bar */}
      <div className="work-controls-bar">
        <div className="work-filter-tabs">
          <button
            className={`work-tab-btn ${activeFilter === "all" ? "is-active" : ""}`}
            onClick={() => {
              setActiveFilter("all");
              setActiveProject(null);
            }}
          >
            All Projects ({projectsData.length})
          </button>
          <button
            className={`work-tab-btn ${activeFilter === "web" ? "is-active" : ""}`}
            onClick={() => {
              setActiveFilter("web");
              setActiveProject(null);
            }}
          >
            Web Dev ({projectsData.filter((p) => p.type === "web").length})
          </button>
          <button
            className={`work-tab-btn ${activeFilter === "ui" ? "is-active" : ""}`}
            onClick={() => {
              setActiveFilter("ui");
              setActiveProject(null);
            }}
          >
            UI / UX ({projectsData.filter((p) => p.type === "ui").length})
          </button>
        </div>

        <div className="work-view-toggle">
          <button
            className={`view-btn ${viewMode === "grid" ? "is-active" : ""}`}
            onClick={() => setViewMode("grid")}
            aria-label="Grid View"
          >
            <Grid size={18} />
          </button>
          <button
            className={`view-btn ${viewMode === "list" ? "is-active" : ""}`}
            onClick={() => setViewMode("list")}
            aria-label="List View"
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {/* GRID VIEW SHOWCASE */}
      {viewMode === "grid" && (
        <div className="work-grid-showcase">
          {filteredProjects.map((project) => (
            <Link
              to={`/work/${project.slug}`}
              className="work-grid-card"
              key={project.id}
            >
              {/* Framed Image Header */}
              <div
                className="work-card-img-frame"
                style={{ backgroundColor: project.bgColor || "#e6e3da" }}
              >
                <div className="work-card-img-inner">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="work-card-image"
                    loading="lazy"
                  />
                </div>

                {/* Floating Hover View Circle Badge */}
                <div className="work-card-hover-badge">
                  <span>View</span>
                </div>
              </div>

              {/* Card Meta Content below frame matching reference design */}
              <div className="work-card-meta-container">
                <h2 className="work-card-title">{project.title}</h2>
                <div className="work-card-divider"></div>
                <div className="work-card-bottom-row">
                  <span className="work-card-category">{project.category}</span>
                  <span className="work-card-year">{project.year}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* LIST VIEW SHOWCASE (WITH CURSOR HOVER PREVIEW) */}
      {viewMode === "list" && (
        <div
          className="work-list-showcase"
          ref={sectionRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setActiveProject(null);
          }}
        >
          <div
            className="work-list-container"
            onMouseLeave={() => setActiveProject(null)}
          >
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`work-list-row ${activeProject === index ? "is-active" : ""}`}
                onClick={() => navigate(`/work/${project.slug}`)}
                onMouseEnter={() => setActiveProject(index)}
                onMouseLeave={() => setActiveProject(null)}
              >
                <div className="work-row-title-col">
                  <h2 className="work-row-title">{project.title}</h2>
                  <span className="work-row-category">{project.category}</span>
                </div>

                <div className="work-row-right-col">
                  <span className="work-row-year">{project.year}</span>
                  <div className="work-row-arrow">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Floating Hover Preview Card */}
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

          {/* Floating Cursor Badge */}
          <div
            ref={cursorLabelRef}
            className={`floating-cursor-badge ${isHovered && activeProject !== null ? "is-visible" : ""}`}
          >
            <span>View</span>
          </div>
        </div>
      )}

      {/* Footer CTA */}
      <footer className="work-footer-cta">
        <h2>Have a project in mind?</h2>
        <a href="mailto:emekaokoro281@gmail.com" className="btn-get-in-touch">
          <span>Let's talk business</span>
          <div className="badge-icon">
            <ArrowUpRight size={18} />
          </div>
        </a>
      </footer>
    </div>
  );
}
