import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ContactUs.css'; 

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Example fetch request (replace with your backend API endpoint)
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          alert('Message sent successfully!');
          setFormData({ name: '', email: '', message: '' });
        } else {
          alert('Failed to send message. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error sending message:', error);
        alert('An error occurred. Please try again later.');
      });
  };

  return (
    <div className="container">
      <div className="left">
        <img src="/images/people.jpg" alt="People" className="photo" />
      </div>
      <div className="right">
        <h1>Contact Us</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <p>Contact:ask_academia.com</p>
          <p>Based in Kathmandu, Nepal</p>
          <input type="submit" value="Submit" />
        </form>
        <div className="social">
          <Link to={{ pathname: "https://www.facebook.com" }} target="_blank" rel="noopener noreferrer">
            <img src="/images/facebook.png" alt="Facebook" />
          </Link>
          <Link to={{ pathname: "https://www.instagram.com" }} target="_blank" rel="noopener noreferrer">
            <img src="/images/instagram.png" alt="Instagram" />
          </Link>
          <Link to={{ pathname: "https://www.twitter.com" }} target="_blank" rel="noopener noreferrer">
            <img src="/images/twitter.png" alt="Twitter" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
