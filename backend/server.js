const express = require("express");
const cors = require("cors"); // Import cors

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json());

// Function to evaluate password strength
const evaluatePassword = (password) => {
  let score = 0;

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

  if (score <= 2) return "Weak";
  if (score === 3) return "Good";
  if (score === 4) return "Strong";
  return "Excellent";
};

// POST route to validate the password
app.post("/api/validate-password", (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  const strength = evaluatePassword(password);
  res.json({ strength });
});

app.get("/", (req, res) => {
  res.send("Welcome to the Password Validator API!");
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
