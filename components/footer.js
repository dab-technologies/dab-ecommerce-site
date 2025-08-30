import { useState } from 'react';

import Link from 'next/link';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  Heart
} from 'lucide-react';
import './footer.css';

export default function Footer({onOpenAbout, onOpenContact}) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="footer-container">
          <div className="footer-grid">
            {/* Company Info */}
            <div className="footer-section">
              <div className="footer-logo">
                <h3 className="logo-text">DAB Technologies</h3>
                <div className="logo-accent"></div>
              </div>
              <p className="footer-description">
                Your trusted marketplace for quality products. We connect buyers and sellers
                in a seamless, eco-friendly shopping experience.
              </p>
              <div className="social-links">
                <a href="#" className="social-link" aria-label="Facebook">
                  <Facebook className="social-icon" />
                </a>
                <a href="#" className="social-link" aria-label="Twitter">
                  <Twitter className="social-icon" />
                </a>
                <a href="https://www.instagram.com/dabtechnologies?igsh=MWc2NHRjcGt0eGtxdg%3D%3D&utm_source=qr" className="social-link" aria-label="Instagram">
                  <Instagram className="social-icon" />
                </a>
                {/* <a href="#" className="social-link" aria-label="LinkedIn">
                  <Linkedin className="social-icon" />
                </a> */}
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h4 className="footer-title">Quick Links</h4>
              <nav className="footer-nav">
                <Link href="/" className="footer-link">Home</Link>

                
                
                <h3 className="footer-link" onClick={() => {
                  onOpenAbout();
                  setIsMenuOpen(false);
                }}>About Us</h3>
              </nav>
            </div>

            {/* Support */}
            <div className="footer-section">
              <h4 className="footer-title" >Support</h4>
              <nav className="footer-nav">
                <h4 onClick={() => {
                  onOpenContact();
                  setIsMenuOpen(false);
                }} className="footer-link">Help Center</h4>
                {/* <Link href="/contact" className="footer-link">Contact Us</Link> */}
                <h3 onClick={() => {
                  onOpenContact();
                  setIsMenuOpen(false);
                }} className="footer-link">FAQ</h3>
                {/* <Link href="/shipping" className="footer-link">Shipping Info</Link> */}
                {/* <Link href="/returns" className="footer-link">Returns</Link> */}
                {/* <Link href="/safety" className="footer-link">Safety Tips</Link> */}
              </nav>
            </div>

            {/* Contact Info */}
            <div className="footer-section">
              <h4 className="footer-title">Get In Touch</h4>
              <div className="contact-info">
                <div className="contact-item">
                  <Mail className="contact-icon" />
                  <div>
                    <p className="contact-label">Email</p>
                    <a href="mailto:support@ecostore.com" className="contact-value">
                      bawsinekud80@gmail.com
                    </a>
                  </div>
                </div>
                <div className="contact-item">
                  <Phone className="contact-icon" />
                  <div>
                    <p className="contact-label">Phone</p>
                    <a href="tel:+1234567890" className="contact-value">
                      +233 (551) 015-625
                    </a>
                  </div>
                </div>
                <div className="contact-item">
                  <MapPin className="contact-icon" />
                  <div>
                    <p className="contact-label">Address</p>
                    <p className="contact-value">
                      Legon<br />
                      Accra, Ghana
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="newsletter-section">
        <div className="footer-container">
          <div className="newsletter-content">
            <div className="newsletter-text">
              <h3 className="newsletter-title">Stay Updated</h3>
              <p className="newsletter-description">
                Subscribe to get notifications about new products and exclusive deals.
              </p>
            </div>
            <form className="newsletter-form">
              <div className="newsletter-input-group">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="newsletter-button">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-container">
          <div className="footer-bottom-content">
            <div className="footer-bottom-left">
              <p className="copyright">
                © {currentYear} DAB technologies. All rights reserved.
              </p>
              <div className="footer-bottom-links">
                <Link href="/privacy" className="footer-bottom-link">Privacy Policy</Link>
                <Link href="/terms" className="footer-bottom-link">Terms of Service</Link>
                <Link href="/cookies" className="footer-bottom-link">Cookie Policy</Link>
              </div>
            </div>
            <div className="footer-bottom-right">
              <p className="made-with">
                Made with <Heart className="heart-icon" /> in Ghana
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="scroll-to-top"
        aria-label="Scroll to top"
      >
        <ArrowUp className="scroll-icon" />
      </button>
    </footer>
  );
}