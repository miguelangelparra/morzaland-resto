const Sequelize = require('sequelize')
const sequelize = new Sequelize('mysql://root@localhost:3306/morzalandbd');

// sequelize.authenticate().then(async () => {
//   const query = 'SELECT * FROM usuarios';
//   const result = await sequelize.query(query, { raw: true })

// })

module.exports =  {

 createUser: (user) => {
  sequelize.authenticate().then(async () => {
    const {document, first_name, last_name, email, phone, address} = user
    const query = "INSERT INTO users_tb (document, first_name, last_name, email, phone, address,rol) VALUES ('" + document + "','" + first_name + "´,´" + last_name + "','" + email + "','" + "','" + phone + "','" + address + "','user')"
    const result = await sequelize.query(query, { raw: true })
    return result
  })
},
 loginUser : (user) => {
   console.log(user)
  sequelize.authenticate().then(async () => {
    const {email, password} = user
    const query = "SELECT * FROM users_tb WHERE email='" + email + "'"
    const result = await sequelize.query(query)
    if (result.password == password) {
      const infoUser = {
        document: result.document,
        first_name: result.first_name,
        last_name: result.last_name,
        email: result.email,
        phone: result.phone,
        address: result.address,
        rol: result.rol
      }
      const token = jwt.sign(infoUser, "LaClaveSecreta")
      return token
    } else {
      return false
    }

  })
}
}
