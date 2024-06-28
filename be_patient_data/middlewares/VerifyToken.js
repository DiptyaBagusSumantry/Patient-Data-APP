const jwt = require ("jsonwebtoken");

async function  verifyToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
        if(error) return res.sendStatus(403);
        req.username = decoded.username;
        next();
    })
}

module.exports = verifyToken;