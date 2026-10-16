import React, { useState, useRef } from "react";
import "../css/AccessibleFormToolkit.css";

export default function AccessibleFormToolkit() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [lastSubmittedEmail, setLastSubmittedEmail] = useState("");

  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const prevEmailRef = useRef("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email structure.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }

    setErrors(newErrors);

    if (newErrors.name) {
      nameInputRef.current?.focus();
      return;
    }
    if (newErrors.email) {
      emailInputRef.current?.focus();
      return;
    }
    if (newErrors.password) {
      passwordInputRef.current?.focus();
      return;
    }

    setLastSubmittedEmail(prevEmailRef.current);
    prevEmailRef.current = formData.email;

    setFormData({
      name: "",
      email: "",
      password: "",
    });
    setErrors({});
  };

  return (
    <div className="form-toolkit-card">
      <h2 className="form-toolkit-title">Accessible Form Toolkit</h2>

      {lastSubmittedEmail && (
        <div className="previous-submission-alert">
          Previous Submitted Email: <strong>{lastSubmittedEmail}</strong>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name-input">Name</label>
          <input
            id="name-input"
            type="text"
            name="name"
            ref={nameInputRef}
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "input-error" : ""}
            placeholder="Juan Dela Cruz"
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email-input">Email</label>
          <input
            id="email-input"
            type="text"
            name="email"
            ref={emailInputRef}
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "input-error" : ""}
            placeholder="user@example.com"
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password-input">Password</label>
          <input
            id="password-input"
            type="password"
            name="password"
            ref={passwordInputRef}
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? "input-error" : ""}
            placeholder="At least 8 characters"
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>

        <button type="submit" className="form-submit-btn">
          Submit Registration
        </button>
      </form>
    </div>
  );
}