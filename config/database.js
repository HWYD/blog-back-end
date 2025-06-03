import Sequelize from 'sequelize'

const db_password = process.env.NODE_ENV == 'development' ? 'mysql3306' : '3324742.aA'

const sequelize = new Sequelize('blog_db', 'root', db_password, {
  host: '127.0.0.1',
  dialect: 'mysql',
  port: 3306
})

export default sequelize
