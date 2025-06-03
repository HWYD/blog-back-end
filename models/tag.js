import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

// 定义模型
const Tag = sequelize.define(
  'Tag',
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
    }
  },
  {
    tableName: 'tag', // 指定表格名称
    timestamps: true, // 禁止 Sequelize 自动生成 createdAt 和 updatedAt 字段
    createdAt: 'create_time',
    updatedAt: 'update_time'
  }
)

export default Tag
