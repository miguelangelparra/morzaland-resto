const Sequelize = require('sequelize')
const sequelize = new Sequelize('mysql://user:pass@host:port/database');

sequelize.authentucate().then(async()=>{
const query = 'SELECT * FROM usuarios';
const resultados= await sequelize.query(query,{raw:true})

})