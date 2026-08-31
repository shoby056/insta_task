const {
  getUsers,
  createUser
} = require("../models/userModel");

// ===============================
// SIGNUP
// ===============================

const signup = (req, res) => {
  try {
    const {
      emailOrMobile,
      password,
      day,
      month,
      year,
      fullName,
      username
    } = req.body;

    // Check required fields
    if (
      !emailOrMobile ||
      !password ||
      !day ||
      !month ||
      !year ||
      !fullName ||
      !username
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // Existing users
    const users = getUsers();

    // Check email/mobile already exists
    const existingEmail = users.find(
      (user) => user.emailOrMobile === emailOrMobile
    );

    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: "Email or mobile number already registered"
      });
    }

    // Check username already exists
    const existingUsername = users.find(
      (user) => user.username === username
    );

    if (existingUsername) {
      return res.status(409).json({
        success: false,
        message: "Username already taken"
      });
    }

    // New user
    const newUser = {
      id: Date.now().toString(),
      emailOrMobile,
      password,
      day,
      month,
      year,
      fullName,
      username
    };

    // Save user
    createUser(newUser);

    // Response
    res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: {
        id: newUser.id,
        emailOrMobile: newUser.emailOrMobile,
        fullName: newUser.fullName,
        username: newUser.username
      }
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


// ===============================
// LOGIN
// ===============================

const login = (req, res) => {
  try {
    const {
      emailOrMobile,
      password
    } = req.body;

    // Check fields
    if (!emailOrMobile || !password) {
      return res.status(400).json({
        success: false,
        message: "Email/username and password are required"
      });
    }

    const users = getUsers();

    // Find user
    const user = users.find(
      (user) =>
        user.emailOrMobile === emailOrMobile ||
        user.username === emailOrMobile
    );

    // User doesn't exist
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid username/email or password"
      });
    }

    // Password check
    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid username/email or password"
      });
    }

    // Login successful
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        emailOrMobile: user.emailOrMobile,
        fullName: user.fullName,
        username: user.username
      }
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


module.exports = {
  signup,
  login
};