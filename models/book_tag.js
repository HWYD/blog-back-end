import sequelize from '../config/database.js'
import { DataTypes } from 'sequelize';
import Tag from './tag.js';
import Book from './book.js';

// 定义模型
const BookTag = sequelize.define(
    'BookTag',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Book',
            key: 'id'
        }
      },
      tag_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Tag',
            key: 'id'
        }
      }
    },
    {
      tableName: 'book_tag', // 指定表格名称
      timestamps: true, // 禁止 Sequelize 自动生成 createdAt 和 updatedAt 字段
      createdAt: 'create_time',
      updatedAt: 'update_time'
    }
  )
  
  // // 定义关联关系（可选，根据实际需求决定是否在这里定义）
  //   Book.hasMany(BookTag,{
  //     foreignKey: 'book_id'
  //   });
  //   Tag.hasMany(BookTag,{
  //     foreignKey: 'tag_id'
  //   });
  //   BookTag.belongsTo(Book,{
  //     foreignKey: 'book_id', // 这里的外键就是前面在User模型关联时指定的同一个外键字段
  //     targetKey: 'id'
  //   });
  //   BookTag.belongsTo(Tag,{
  //     foreignKey: 'tag_id', // 这里的外键就是前面在User模型关联时指定的同一个外键字段
  //     targetKey: 'id'
  //   });

export default BookTag;

  