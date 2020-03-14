const Sequelize = require('sequelize')
const sequelize = new Sequelize('mysql://user:pass@host:port/database');

sequelize.authenticate().then(async () => {
  const query = 'SELECT * FROM usuarios';
  const result = await sequelize.query(query, { raw: true })

})

//USERS
const createUser = (user) => {
  sequelize.authenticate().then(async () => {
    const [document, first_name, last_name, email, phone, address] = user
    const query = "INSERT INTO users_tb (document, first_name, last_name, email, phone, address) VALUES ('" + document + "','" + first_name + "´,´" + last_name + "','" + email + "','" + "','" + phone + "','" + address + "','" + ")"
    const result = await sequelize.query(query, { raw: true })
    return result
  })
}

const loginUser = (user) => {
  sequelize.authenticate().then(async () => {
    const [email, password] = user
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