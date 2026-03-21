"use client";
import React, { useState } from "react";

const slides = [
  {
    img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80",
    text: ["LAND DISPUTES", "& RESOLUTION"],
    service: "Expert representation in land ownership disputes, boundary conflicts, and encroachment cases before civil courts and tribunals.",
  },
  {
    img: "https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?w=1200&q=80",
    text: ["PROPERTY", "DOCUMENTATION"],
    service: "Comprehensive legal documentation services including sale deeds, lease agreements, gift deeds, and title verification.",
  },
  {
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80",
    text: ["REVENUE", "RECORDS"],
    service: "Management and rectification of revenue records, mutation entries, and land revenue matters before revenue authorities.",
  },
  {
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80",
    text: ["COURT", "REPRESENTATION"],
    service: "Strong advocacy in civil courts, Gujarat High Court, and the Supreme Court of India for land and revenue matters.",
  },
  {
    img: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=1200&q=80",
    text: ["LAND", "ACQUISITION"],
    service: "Legal assistance in land acquisition proceedings, compensation disputes, and rehabilitation matters.",
  },
];

export default function Slideshow() {
  const [current, setCurrent] = useState(0);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-slate-900">
      <style jsx>{`
        .slideshow { position: relative; width: 100%; height: 100vh; overflow: hidden; }
        .slide { position: absolute; inset: 0; background-size: cover; background-position: center; opacity: 0; transition: opacity 0.8s ease-in-out; }
        .slide.active { opacity: 1; }
        .slide::after { content: ''; position: absolute; inset: 0; background: rgba(0,0,0,0.55); }
        .slide-text { position: absolute; bottom: 30%; left: 10%; z-index: 10; }
        .slide-text span { display: block; font-size: clamp(2rem, 6vw, 5rem); font-weight: 900; color: white; letter-spacing: 0.1em; line-height: 1; }
        .slide-text span:last-child { color: #EAB308; }
        .nav { position: absolute; top: 50%; transform: translateY(-50%); z-index: 20; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.3); color: white; width: 50px; height: 50px; font-size: 1.5rem; cursor: pointer; backdrop-filter: blur(4px); transition: all 0.3s; }
        .nav:hover { background: #EAB308; border-color: #EAB308; color: black; }
        .nav.left { left: 5%; }
        .nav.right { right: 5%; }
        .counter { position: absolute; bottom: 5%; right: 5%; z-index: 20; color: rgba(255,255,255,0.7); font-size: 0.875rem; letter-spacing: 0.2em; font-family: monospace; }
        .service-desc { position: absolute; bottom: 15%; left: 10%; z-index: 10; color: rgba(255,255,255,0.8); max-width: 500px; font-size: 1rem; line-height: 1.6; }
      `}</style>
      <div className="slideshow">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`slide ${i === current ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.img})` }}
          >
            <div className="slide-text">
              {slide.text.map((t, j) => <span key={j}>{t}</span>)}
            </div>
            <p className="service-desc">{slide.service}</p>
          </div>
        ))}
        <button className="nav left" onClick={prevSlide}>←</button>
        <button className="nav right" onClick={nextSlide}>→</button>
        <div className="counter">0{current + 1} / 0{slides.length}</div>
      </div>
    </section>
  );
}
