const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Incoming Authorization Header:", req.headers.authorization);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from database and attach to request
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    console.log("✅ Authenticated user:", req.user);
    // Now req.user contains full user document (without password)
    next();
  } catch (err) {
    console.error("Authentication error:", err);
    return res.status(401).json({
      message: "Token is not valid",
      error: err.message,
    });
  }
});

const authorize = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    console.log("🔐 Checking role:", userRole);
    console.log("✅ Allowed roles:", roles);

    if (!roles.includes(userRole)) {
      console.log(
        `❌ Unauthorized role: ${userRole} (expected one of: ${roles.join(
          ", "
        )})`
      );
      return res.status(403).json({
        success: false,
        message: `User role ${userRole} is not authorized to access this route`,
      });
    }

    console.log("✅ Role authorized");
    next();
  };
};

module.exports = { protect, authorize };
