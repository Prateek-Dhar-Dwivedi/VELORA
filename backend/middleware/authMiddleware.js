const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    let token = req.headers.authorization || req.query.token;

    if (!token || token === "null" || token === "undefined") {
      return res.status(401).json({
        message: "No token provided. Please log in first.",
      });
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7).trim();
    }

    let decoded;
    const secrets = [
      process.env.JWT_SECRET,
      "jobshieldsecret123",
      "mysecretkey",
    ].filter(Boolean);

    for (const secret of secrets) {
      try {
        decoded = jwt.verify(token, secret);
        break;
      } catch (e) {
        // try next secret
      }
    }

    if (!decoded) {
      return res.status(401).json({
        message: "Invalid Token. Please log in again.",
      });
    }

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({
      message: "Invalid Token. Please log in again.",
    });
  }
};