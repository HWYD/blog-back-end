import sequelize from '../config/database.js'
import { DataTypes } from 'sequelize';


// 定义模型
const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      phone: {
        type: DataTypes.CHAR(250),
        allowNull: false
      },
      password: {
        type: DataTypes.CHAR(250),
        allowNull: false
      },
      email: {
        type: DataTypes.CHAR(250),
        allowNull: false
      },
      age: {
        type: DataTypes.INTEGER(3),
        allowNull: true
      },
      job: {
        type: DataTypes.CHAR(255),
        allowNull: true
      }
    },
    {
      tableName: 'user', // 指定表格名称
      timestamps: false // 禁止 Sequelize 自动生成 createdAt 和 updatedAt 字段
    }
  )

export default User;