const userModel = require("../models/userModel")
const bcrypt = require('bcryptjs');


async function userSignUpController(req, res) {
  try {
    const { email, password, name } = req.body

    const user = await userModel.findOne({ email }) 

    console.log("user", user)

    if (user) {
      throw new Error("usuario ya existente.")
    } 

    if (!email) {
      throw new Error("Ingrese email")
    }
    if (!password) {
      throw new Error("Ingrese contraseña")
    }
    if (!name) {
      throw new Error("Ingrese Nombre")
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      throw new Error("algo anda mal")
    }

    const payload = {
      ...req.body,
      role: "GENERAL",
      password: hashPassword
    }

    const userData = new userModel(payload)
    const saveUser = await userData.save()

    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "Usuario creado satisfactoriamente!"
    })


  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    })
  }
}

module.exports = userSignUpController