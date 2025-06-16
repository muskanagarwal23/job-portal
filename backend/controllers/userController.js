const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role, companyEmail } = req.body;

    if (!name || name.trim().length < 3) {
      return res
        .status(400)
        .json({ message: "Name must be at least 3 characters" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (!password || password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    if (role === "employer") {
      if (!companyEmail) {
        return res
          .status(400)
          .json({ message: "Company email is required for employers" });
      }
      if (!emailRegex.test(companyEmail)) {
        return res
          .status(400)
          .json({ message: "Invalid company email format" });
      }

      if (!companyEmail.endsWith(".com")) {
        return res
          .status(400)
          .json({
            message: "Please use your company email for employer registration",
          });
      }
    }

    let existingUser;
    if (companyEmail) {
      existingUser = await User.findOne({ $or: [{ email }, { companyEmail }] });
    } else {
      existingUser = await User.findOne({ email });
    }

    if (existingUser)
      return res
        .status(400)
        .json({ message: "User or company email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = { name, email, password: hashedPassword, role };
    if (role === "employer") {
      userData.companyEmail = companyEmail;
    }

    const user = await User.create(userData);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({ user: { id: user._id, name, email, role }, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res
      .status(200)
      .json({
        user: { id: user._id, name: user.name, email, role: user.role },
        token,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during login" });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpire = Date.now() + 15 * 60 * 1000;

    user.resetToken = resetToken;
    user.resetTokenExpire = resetTokenExpire;
    await user.save();

    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

    await sendEmail(
      user.email,
      "Password Reset",
      `Click to reset: ${resetLink}`
    );

    res.status(200).json({ message: "Password reset link sent to your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during forgot password" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpire: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    user.resetToken = undefined;
    user.resetTokenExpire = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during password reset" });
  }
};
