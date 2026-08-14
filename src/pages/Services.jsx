import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Layout, Code, CreditCard, ShoppingBag, CheckCircle, Sparkles } from "lucide-react";
import ServiceBuilder from "../components/ServiceBuilder";
import { useScrollReveal } from "../hooks/useScrollReveal";
import "./Services.css";

export default function ServicesPage() {
  useScrollReveal("services");

  const servicesList = [
    {
      id: "ui-ux",
      title: "UI/UX & Product Design",
      icon: <Layout size={28} />,
      tagline: "From concept wireframes to scalable Figma design systems.",
      description:
        "Crafting intuitive user interfaces that convert. I work closely with product teams to design pixel-perfect layouts, responsive design tokens, and interactive prototypes.",
      features: [
        "Figma Wireframing & High-Fidelity Prototypes",
        "Design System & Token Architecture",
        "User Journey & Interaction Design",
        "Fintech, Agritech & Healthtech UI",
      ],
    },
    {
      id: "frontend",
      title: "Frontend Engineering",
      icon: <Code size={28} />,
      tagline: "Modern, high-performance web applications built for speed.",
      description:
        "Transforming Figma designs into clean, maintainable React 19 code. I focus on responsive layouts, buttery-smooth GSAP animations, and fast load times.",
      features: [
        "React 19, JavaScript (ES6+) & TypeScript",
        "GSAP ScrollTrigger & Micro-animations",
        "Vite Build Tooling & Performance Optimization",
        "Cross-browser Responsive Layouts",
      ],
    },
    {
      id: "fintech-agritech",
      title: "Fintech & Specialized App UI",
      icon: <CreditCard size={28} />,
      tagline: "Complex product workflows made simple and secure.",
      description:
        "Designing and shipping intricate user flows such as escrow systems, crypto-to-Naira conversion apps (like Emburse), and real-time agricultural telemetry dashboards.",
      features: [
        "Escrow & Multi-step Financial Flows",
        "Crypto & Fiat Conversion Interfaces",
        "Real-Time Telemetry & Data Dashboards",
        "Security-First UX Patterns",
      ],
    },
    {
      id: "ecommerce",
      title: "E-Commerce & Storefronts",
      icon: <ShoppingBag size={28} />,
      tagline: "High-converting online store templates and Shopify setups.",
      description:
        "Building modern, fast e-commerce experiences designed to maximize conversion rates across mobile and desktop devices.",
      features: [
        "Shopify Customization & Template Design",
        "Mobile-First Shopping Experiences",
        "Instant Cart & Micro-interactions",
        "Product Filtering & Checkout UX",
      ],
    },
  ];

  return (
    <div className="services-page-container">
      {/* Back Navigation Bar */}
      <div className="services-nav-bar">
        <Link to="/" className="btn-back-home">
          <ArrowLeft size={18} />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Hero Header */}
      <header className="services-hero-header reveal-on-scroll">
        <span className="services-hero-tag">SERVICES &amp; SOLUTIONS</span>
        <h1 className="services-hero-title">
          Product UI/UX &amp; Production-Ready <br />
          Frontend Engineering.
        </h1>
        <p className="services-hero-desc">
          Full product cycle expertise — from Figma design systems to shipped, high-performance web applications.
        </p>
      </header>

      {/* Detailed Services Grid */}
      <section className="services-grid-section">
        <div className="services-grid">
          {servicesList.map((service) => (
            <article className="service-card reveal-on-scroll" key={service.id}>
              <div className="service-card-top">
                <div className="service-icon-box">{service.icon}</div>
                <h2 className="service-card-title">{service.title}</h2>
                <span className="service-tagline">{service.tagline}</span>
              </div>

              <p className="service-card-description">{service.description}</p>

              <div className="service-card-divider"></div>

              <ul className="service-features-list">
                {service.features.map((feature) => (
                  <li key={feature}>
                    <CheckCircle size={16} className="feature-check-icon" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Embedded Interactive Service Inquiry Builder */}
      <section className="services-builder-wrapper reveal-on-scroll">
        <ServiceBuilder />
      </section>
    </div>
  );
}
