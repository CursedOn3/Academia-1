import React, { useState } from 'react';
import './Register.css';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password1: '',
    password2: '',
    agreeTerms: false,
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password1, password2, agreeTerms } = formData;

    if (!agreeTerms) {
      setErrorMessage('You must agree to the terms and conditions.');
      return;
    }

    if (password1 !== password2) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setErrorMessage(''); // Clear any existing error message

    // Example fetch request (replace with your backend API endpoint)
    fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password: password1 }),
    })
      .then((response) => {
        if (response.ok) {
          alert('Registration successful!');
          // Redirect or handle successful registration
        } else {
          setErrorMessage('Registration failed. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error during registration:', error);
        setErrorMessage('Something went wrong. Please try again.');
      });
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <h1>Sign Up</h1>
        <div className="input-box">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <i className="bx bx-user"></i>
        </div>
        <div className="input-box">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <i className="bx bx-mail-send"></i>
        </div>
        <div className="input-box">
          <input
            type="password"
            name="password1"
            placeholder="Password"
            value={formData.password1}
            onChange={handleChange}
            required
          />
          <i className="bx bx-lock-alt"></i>
        </div>
        <div className="input-box">
          <input
            type="password"
            name="password2"
            placeholder="Confirm Password"
            value={formData.password2}
            onChange={handleChange}
            required
          />
          <i className="bx bx-lock-alt"></i>
        </div>
        <div className="terms">
          <input
            type="checkbox"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleChange}
          />
          <label htmlFor="agreeTerms">I agree to the terms and conditions</label>
        </div>
        <button type="submit" className="btn">Sign Up</button>
        <div className="register-link">
          <p>
            Already a member? <a href="/login">Login here</a>
          </p>
        </div>
        <div className="register-link">
          <p><a href="#">Register as Teacher</a></p>
        </div>
      </form>
    </div>
  );
}

export default Register;
