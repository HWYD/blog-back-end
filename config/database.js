import Sequelize from 'sequelize'

const sequelize = new Sequelize('test1', 'root', 'mysql3306', {
  host: '127.0.0.1',
  dialect: 'mysql',
  port: 3306,
})

export default sequelize;