import React, { useState, useRef, useEffect } from "react";
import "./ServiceBuilder.css";
import { ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const availableServices = [
  "Website",
  "Artificial Intelligence",
  "Branding",
  "Applications (web & mobile)",
  "SEO/GEO",
  "Shopify",
  "API Integration",
  "Website Migration",
  "Blockchain",
  "Maintenance",
  "Second Opinion",
];

export default function ServiceBuilder() {
  const [selectedServices, setSelectedServices] = useState(["Blockchain"]);
  const pillsListRef = useRef(null);

  // Trigger scroll reveal animations for headers & rows
  useScrollReveal(selectedServices);

  // Auto-scroll pill container to show newly added services
  useEffect(() => {
    if (pillsListRef.current) {
      pillsListRef.current.scrollTo({
        left: pillsListRef.current.scrollWidth,
        behavior: "smooth",
      });
    }
  }, [selectedServices]);

  const toggleService = (service) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((s) => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const removeService = (service) => {
    setSelectedServices(selectedServices.filter((s) => s !== service));
  };

  const handleNext = () => {
    const servicesList = selectedServices.length > 0
      ? selectedServices.map((s) => `• ${s}`).join("\n")
      : "• Custom Project Request";

    const message = encodeURIComponent(
      `Hi Emeka (FrontEndDoctor),\n\nI am interested in working together on:\n${servicesList}\n\nLet's connect!`
    );
    window.open(`https://wa.me/2348141761151?text=${message}`, "_blank");
  };

  return (
    <section className="service-builder-section" id="services">
      {/* Big Header Title */}
      <div className="builder-header reveal-on-scroll">
        <h2 className="builder-title">
          Tell us what you <br />
          need.
        </h2>
      </div>

      {/* Floating Selection Bar */}
      <div className="selection-bar-wrapper reveal-on-scroll delay-100">
        <div className="selection-bar">
          <span className="selection-label">I need a</span>

          <div className="selected-pills-list" ref={pillsListRef}>
            {selectedServices.map((service) => (
              <div className="selected-pill" key={service}>
                <span>{service}</span>
                <button
                  className="btn-remove-pill"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeService(service);
                  }}
                  aria-label={`Remove ${service}`}
                >
                  ×
                </button>
              </div>
            ))}

            {selectedServices.length === 0 && (
              <span className="placeholder-text">Select services below...</span>
            )}
          </div>

          <div className="selection-bar-actions">
            <button className="btn-add-icon" aria-label="Add service">
              +
            </button>

            <button className="btn-next-action" onClick={handleNext}>
              <span>Next</span>
              <ArrowUpRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Two-Column Interactive Options Grid */}
      <div className="services-grid">
        {availableServices.map((service) => {
          const isSelected = selectedServices.includes(service);

          return (
            <div
              key={service}
              className={`service-option-row ${isSelected ? "is-selected" : ""}`}
              onClick={() => toggleService(service)}
            >
              <div className="service-option-left">
                <span className="corner-arrow">↳</span>
                <span className="service-name">{service}</span>
              </div>

              <button className="service-toggle-btn" aria-label={`Toggle ${service}`}>
                {isSelected ? "×" : "+"}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
