const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Ingrese email", error: true, success: false });
    }
    if (!password) {
      return res.status(400).json({ message: "Ingrese contraseña", error: true, success: false });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado", error: true, success: false });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    console.log("verifica contraseña", checkPassword);

    if (checkPassword) {
      const tokenData = {
        _id: user._id,
        email: user.email,
      };
      const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '8h' });

      const tokenOption = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      };

      res.cookie("token", token, tokenOption).status(200).json({
        message: "Ingreso exitoso",
        data: token,
        success: true,
        error: false,
      });
    } else {
      return res.status(401).json({ message: "Porfavor Verifique Contraseña", error: true, success: false });
    }

  } catch (err) {
    res.status(500).json({
      message: err.message || "Error interno del servidor",
      error: true,
      success: false,
    });
  }
}

module.exports = userSignInController;
