import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { projectsData } from "../data/projectsData";
import { useScrollReveal } from "../hooks/useScrollReveal";
import "./ProjectDetail.css";

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Find active paroject by slug or fallback to first
  const projectIndex = projectsData.findIndex((p) => p.slug === slug);
  const project = projectIndex !== -1 ? projectsData[projectIndex] : projectsData[0];

  // Calculate next project for bottom footer navigation
  const nextIndex = (projectIndex + 1) % projectsData.length;
  const nextProject = projectsData[nextIndex];

  // Enable scroll reveal animations
  useScrollReveal(slug);

  // Scroll to top when project slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="project-detail-container">
        <h2>Project not found</h2>
        <Link to="/work" className="btn-back-work">
          ← Back to Work
        </Link>
      </div>
    );
  }

  return (
    <article className="project-detail-container">
      {/* Top Navigation Bar */}
      <div className="project-detail-nav">
        <Link to="/work" className="btn-back-work">
          <ArrowLeft size={18} />
          <span>All Work</span>
        </Link>

        <div className="project-nav-actions">
          <button
            className="btn-next-project"
            onClick={() => navigate(`/work/${nextProject.slug}`)}
          >
            <span>Next Project</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Project Main Header */}
      <header className="project-detail-header reveal-on-scroll">
        <span className="project-category-tag">{project.category}</span>
        <h1 className="project-title">{project.title}</h1>
        <p className="project-tagline">{project.description}</p>
      </header>

      {/* Meta Specs Grid */}
      <div className="project-meta-grid reveal-on-scroll delay-100">
        <div className="meta-col">
          <span className="meta-label">Client</span>
          <span className="meta-value">{project.client}</span>
        </div>

        <div className="meta-col">
          <span className="meta-label">Role &amp; Services</span>
          <span className="meta-value">{project.role}</span>
        </div>

        <div className="meta-col">
          <span className="meta-label">Year</span>
          <span className="meta-value">{project.year}</span>
        </div>

        <div className="meta-col">
          <span className="meta-label">Live Project</span>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-visit-live"
          >
            <span>Visit Site</span>
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>

      {/* Main Showcase Hero Image */}
      <div
        className="project-hero-frame reveal-on-scroll delay-200"
        style={{ backgroundColor: project.bgColor || "#e6e3da" }}
      >
        <div className="project-hero-img-container">
          <img src={project.image} alt={project.title} className="project-hero-image" />
        </div>
      </div>

      {/* Case Study Deep Dive Section */}
      <section className="case-study-section">
        <div className="case-study-grid">
          {/* Challenge Box */}
          <div className="case-box reveal-on-scroll">
            <span className="case-box-label">01 / THE CHALLENGE</span>
            <h2 className="case-box-title">Defining the problem space</h2>
            <p className="case-box-text">{project.challenge}</p>
          </div>

          {/* Solution Box */}
          <div className="case-box reveal-on-scroll delay-100">
            <span className="case-box-label">02 / THE SOLUTION</span>
            <h2 className="case-box-title">Engineering the experience</h2>
            <p className="case-box-text">{project.solution}</p>
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="project-tech-section reveal-on-scroll">
          <h3 className="tech-section-title">Technologies &amp; Architecture</h3>
          <div className="tech-pills-list">
            {project.tech.map((t) => (
              <div className="tech-pill-item" key={t}>
                <CheckCircle2 size={16} className="pill-check-icon" />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshot Gallery Grid */}
      <section className="project-gallery-section">
        <h3 className="gallery-section-title reveal-on-scroll">Visual Interface Gallery</h3>
        <div className="project-gallery-grid">
          {project.gallery.map((imgSrc, idx) => (
            <div
              className="gallery-grid-item reveal-on-scroll"
              key={idx}
              style={{ backgroundColor: project.bgColor || "#e6e3da" }}
            >
              <img src={imgSrc} alt={`${project.title} screenshot ${idx + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      {/* Next Project Footer Banner */}
      <footer className="next-project-footer reveal-on-scroll">
        <span className="next-footer-sub">UP NEXT</span>
        <Link to={`/work/${nextProject.slug}`} className="next-project-link">
          <h2 className="next-project-title">{nextProject.title}</h2>
          <div className="next-arrow-circle">
            <ArrowRight size={24} />
          </div>
        </Link>
      </footer>
    </article>
  );
}
