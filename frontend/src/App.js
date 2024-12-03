import React, { useState } from "react";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");
  const [error, setError] = useState("");

  const checkPasswordStrength = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/validate-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to validate password");
      }

      const data = await response.json();
      setStrength(data.strength);
      setError("");
    } catch (err) {
      setError("Error validating password. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="app-container">
      <h1>Password Strength Checker</h1>
      <div className="form-container">
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="password-input"
        />
        <button onClick={checkPasswordStrength} className="check-button">
          Check Strength
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
      {strength && (
        <div className={`strength-display ${strength.toLowerCase()}`}>
          Password Strength: <strong>{strength}</strong>
        </div>
      )}
    </div>
  );
}

export default App;
