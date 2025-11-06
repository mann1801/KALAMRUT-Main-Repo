import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/style.css";

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return {
    isValid: emailRegex.test(email),
    message: email ? 'Please enter a valid email address' : 'Email is required'
  };
};

const validatePassword = (password) => {
  const minLength = 8;
  const maxLength = 12;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]+/.test(password);
  const isLongEnough = password.length >= minLength;
  const isNotTooLong = password.length <= maxLength;
  
  return {
    isValid: hasUpperCase && hasLowerCase && hasSpecialChar && isLongEnough && isNotTooLong,
    errors: {
      length: !isLongEnough ? `8-12 characters` : (isNotTooLong ? '' : 'Max 12 characters'),
      upperCase: !hasUpperCase ? 'Uppercase' : '',
      lowerCase: !hasLowerCase ? 'Lowercase' : '',
      specialChar: !hasSpecialChar ? 'Special char' : ''
    }
  };
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordErrors, setPasswordErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const redirectTo = searchParams.get('redirect') || '/ai-art';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setEmailError("");

    // Validate email
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      setEmailError(emailValidation.message);
      return;
    }

    // Validate password
    const { isValid, errors } = validatePassword(password);
    setPasswordErrors(errors);
    
    if (!isValid) {
      setError("Please check your password and try again");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (res.ok && data.access) {
        // Get guest cart before login (if any)
        const guestCart = localStorage.getItem('cart_guest');
        
        // Set new auth data
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        // Alias to support code that expects 'token'
        localStorage.setItem("token", data.access);
        const userData = { username, email };
        localStorage.setItem('user', JSON.stringify(userData));
        
        // If there was a guest cart, migrate it to the user's cart
        if (guestCart) {
          localStorage.setItem(`cart_${email}`, guestCart);
          localStorage.removeItem('cart_guest');
        }
        
        // Redirect to the intended URL or default to /ai-art
        window.location.href = redirectTo;
      } else {
        setError(data.detail || "Login failed");
      }
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div className="classic-login-container">
      {/* Background Pattern */}
      <div className="classic-bg-pattern"></div>
      
      {/* Main Content */}
      <div className="classic-login-frame">
        <div className="classic-login-header">
          <div className="classic-logo">
            <span className="classic-logo-text">कलामृत</span>
            <div className="classic-logo-ornament"></div>
          </div>
          <h1 className="classic-login-title">Welcome Back</h1>
          <p className="classic-login-subtitle">Enter your credentials to access AI Art</p>
        </div>

        <form onSubmit={handleSubmit} className="classic-login-form">
          <div className="classic-form-group">
            <label htmlFor="username" className="classic-label">
              <span className="classic-label-icon">👤</span>
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="classic-input"
              required
            />
          </div>

          <div className="classic-form-group">
            <label htmlFor="email" className="classic-label">
              <span className="classic-label-icon">📧</span>
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) {
                  const { isValid } = validateEmail(e.target.value);
                  if (isValid) setEmailError("");
                }
              }}
              onBlur={() => {
                const { isValid, message } = validateEmail(email);
                if (!isValid) setEmailError(message);
              }}
              className={`classic-input ${emailError ? 'input-error' : ''}`}
              required
            />
            {emailError && <div className="error-message">{emailError}</div>}
          </div>

          <div className="classic-form-group">
            <label htmlFor="password" className="classic-label">
              <span className="classic-label-icon">🔒</span>
              Password
            </label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="classic-input"
                required
              />
              <button 
                type="button" 
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            <div className="password-requirements">
              <p className="requirement">Password requirements:</p>
              <ul className="requirement-list">
                <li className={password.length >= 8 && password.length <= 12 ? 'valid' : ''}>
                  {password.length < 8 ? '8-12 chars' : (password.length > 12 ? 'Max 12 chars' : '8-12 chars')}
                </li>
                <li className={/[A-Z]/.test(password) ? 'valid' : ''}>Uppercase</li>
                <li className={/[a-z]/.test(password) ? 'valid' : ''}>Lowercase</li>
                <li className={/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]+/.test(password) ? 'valid' : ''}>Special char</li>
              </ul>
            </div>
          </div>

          {error && (
            <div className="classic-error">
              <span className="classic-error-icon">⚠️</span>
              {error}
            </div>
          )}

          <button type="submit" className="classic-login-btn">
            <span className="classic-btn-text">Sign In</span>
            <span className="classic-btn-ornament">✦</span>
          </button>
        </form>

        <div className="classic-login-footer">
          <p className="classic-signup-link">
            Don't have an account? 
            <Link to="/signup" className="classic-link"> Create one here</Link>
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="classic-corner-ornament top-left"></div>
        <div className="classic-corner-ornament top-right"></div>
        <div className="classic-corner-ornament bottom-left"></div>
        <div className="classic-corner-ornament bottom-right"></div>
      </div>
    </div>
  );
};

export default Login;
