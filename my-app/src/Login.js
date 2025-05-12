import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showLogin, setShowLogin] = useState(false); 
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    
    const patientSelectionDummy= { email: "user@example.com", password: "password123" };
    const doctordashboardDummy = { email: "patient@example.com", password: "patientpass" };
    
   
    if (email === doctordashboardDummy.email && pass === doctordashboardDummy.password) {
      if (rememberMe) {
        localStorage.setItem("email", email);
      }
      navigate("/patient-selection");
    } else if (email === patientSelectionDummy.email && pass === patientSelectionDummy.password) {
      if (rememberMe) {
        localStorage.setItem("email", email);
      }
      navigate("/dashboard");
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  
  return (
    <div className="app-container">
      
      <Header onLoginClick={() => setShowLogin(true)} />

      {showLogin && (
        <div className="form-container">
          <form className="login-form" onSubmit={handleLogin}>
            <h2>Login</h2>

            <div className="input-group">
              <label>Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                type="password"
                required
              />
            </div>

            {error && <p className="error">{error}</p>}

            <div className="remember-me">
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                Remember Me
             </label>
           </div>

            <button type="submit">Login</button>
          </form>
        </div>
      )}
    <Footer />
    </div>
  );
};