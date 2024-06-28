const jwt = require("jsonwebtoken");

function accesToken(req) {
   const authHeader = req.headers["authorization"];
   const token = authHeader && authHeader.split(" ")[1];
    
  const accesToken = jwt.verify(
    token,
    process.env.REFRESH_TOKEN_SECRET,
    (error, decoded) => {
      if (error) return res.sendStatus(403);
      return decoded;
    }
  );
  
  //SGKMS REFRESH SESSION TOKEN
  // if (accesToken.exp >= accesToken.expiredAt) {
    
  // }

  return accesToken;
}

module.exports = { accesToken };
