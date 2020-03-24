const Sequelize = require('sequelize')
const sequelize = new Sequelize('mysql://root@localhost:3306/morzalandbd');
const jwt = require('jsonwebtoken')
// sequelize.authenticate().then(async () => {
//   const query = 'SELECT * FROM usuarios';
//   const result = await sequelize.query(query, { raw: true })

// })

module.exports = {

  createUser: (user) => {
    sequelize.authenticate().then(async () => {
      try {
        const { document, first_name, last_name, email, password, phone, address } = user
        const query = "INSERT INTO users_tb (document, first_name, last_name, email, password, phone, address,role) VALUES ('" + document + "','" + first_name + "','" + last_name + "','" + email + "','" + password + "','" + phone + "','" + address + "','user')"
        const result = await sequelize.query(query, { raw: true })
        return result
      } catch (err) {
        console.log(err)
        return false
      }
    })
  },
  loginUser: (user) => {
    sequelize.authenticate().then(async () => {
      const { email, password } = user
      const query = "SELECT * FROM users_tb WHERE email='" + email + "'"
      const result = await sequelize.query(query)
      const resultBD = result[0][0]
      
      if (resultBD.password == password) {
        const infoUser = {
          id: resultBD.id,
          document: resultBD.document,
          first_name: resultBD.first_name,
          last_name: resultBD.last_name,
          email: resultBD.email,
          phone: resultBD.phone,
          address: resultBD.address,
          role: resultBD.role
        }
        const token = jwt.sign(infoUser, "LaClaveSecreta")
        return token
      } else {
        return false
      }

    })
  }
}
