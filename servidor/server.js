//Importa modulo de express
const express = require('express');
const [createUser] = require('./model')
//Asigna la ejecucion de express a una constante 
const app = express();
//Ejecuta la escucha de express al puero 3000, lo cual recibe un callback
app.listen(3000, () => {
  console.log("El servidor se inicio correctamente ")
})

app.get("/", (req, res) => {
  Response("Bienvenido")
})
//USERS
//LOGIN 
app.post("user/login", async (req, res) => {
  try {
    const authentication = await loginUser(req.user)
    if (authentication != false) {
      res.json(authentication)
    }
  }
  catch (e) {
    res.json({
      message: "Something did not work!, try again ",
      error: e
    })
  }
})
//CREATE USER
app.post("/user/create", async (req, res) => {
  try {
    createUser(req.user)
    await res.json({ message: "User was create success" })
  }
  catch (e) {
    res.json({
      message: "Something did work!, try again! ",
      error: e
    })
  }
})

