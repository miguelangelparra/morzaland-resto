//Importa modulo de express
const express = require('express');
//Asigna la ejecucion de express a una constante 
const app= express();
//Ejecuta la escucha de express al puero 3000, lo cual recibe un callback
app.listen(3000, ()=>{
  console.log("El servidor se inicio correctamente ")
})

app.get(()=>{
  Response(hola )
})