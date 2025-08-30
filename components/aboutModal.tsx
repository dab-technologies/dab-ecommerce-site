"use client";
import React from "react";
import "./Modal.css";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content about-modal"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>

        <h2 className="modal-title">About DAB-Technologies</h2>

        <div className="about-hero">
          <img
            src="/tech-store.jpg"
            alt="DAB Technologies Store"
            className="about-hero-img"
          />
        </div>

        <div className="about-section">
          <h3>Who We Are</h3>
          <p>
            At <strong>DAB-Technologies</strong>, we are passionate about
            bringing the best tech products to your fingertips. From smartphones
            and laptops to cars and accessories, we provide quality products at
            unbeatable prices.
          </p>
        </div>

        <div className="about-section">
          <h3>Our Mission</h3>
          <p>
            Our mission is simple: deliver innovation, affordability, and
            excellent customer service. Whether you're a student, gamer, or
            professional, we’ve got something for you.
          </p>
        </div>

        <div className="about-section">
          <h3>Why Choose Us?</h3>
          <ul>
            <li>✔ Wide variety of the latest tech gadgets</li>
            <li>✔ Affordable and transparent pricing</li>
            <li>✔ Trusted by thousands of happy customers</li>
            <li>✔ Excellent customer service and support</li>
          </ul>
        </div>

        <div className="about-gallery">
          <img src="/11pm.jpg" alt="Gadgets" />
          <img src="/laptop.jpg" alt="Laptops" />
          <img src="/accessories.jpg" alt="Accessories" />
        </div>
      </div>
    </div>
  );
}
