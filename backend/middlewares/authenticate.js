const jwt = require("jsonwebtoken");

const authenticateToken = (token) => {
  return function(req,res,next){
    const tokenCookie = req.cookies[token];
  
    if (!tokenCookie) return res.status(401).json({ error: "Unauthorized" });
  
    try {
      const decoded = jwt.verify(tokenCookie, process.env.JWT_SECRET);
      req.user = decoded;
      // console.log("decoded",decoded);
    } catch (err) {
      res.status(401).json({ error: "Invalid token" });
    }
    return next();
  }
};

module.exports = {authenticateToken};
