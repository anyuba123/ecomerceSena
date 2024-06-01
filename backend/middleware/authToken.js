 const jwt = require('jsonwebtoken');
require('dotenv').config();
async function authToken(req, res, next) {
  try {
    const token = req.cookies?.token;
    console.log("Token from request:", token);

    if (!token) {
      return res.status(401).json({
        message: "Usuario no autenticado",
        error: true,
        success: false
      });
    }

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decoded) {
      if (err) {
        console.error("Error verifying JWT:", err);
        return res.status(401).json({
          message: "Token inválido",
          error: true,
          success: false
        });
      }

      console.log("Decoded token payload:", decoded);
      req.userId = decoded._id;
      next();
    });
  } catch (error) {
    console.error("Error en middleware authToken:", error);
    res.status(500).json({
      message: "Error interno del servidor",
      error: true,
      success: false
    });
  }
}

module.exports = authToken;
 

