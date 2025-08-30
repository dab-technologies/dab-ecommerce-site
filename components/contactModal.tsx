"use client"
import React, { FormEvent } from "react"
import "./Modal.css"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  // optional: handle form submission properly
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // you can add logic here (send email, API call, etc.)
    console.log("Form submitted ✅")
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="close-btn"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="modal-title">Contact Us</h2>

        <div className="contact-details">
          <p><strong>Address:</strong> Legon, Accra, Ghana</p>
          <p><strong>Phone:</strong> +233 (551) 015-625</p>
          <p><strong>Email:</strong> bawsinekud80@gmail.com</p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Your Name" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Your Email" required />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" rows={4} placeholder="Your Message" required />
          </div>

          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </div>
    </div>
  )
}

export default ContactModal
