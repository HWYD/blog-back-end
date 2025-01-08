import sequelize from '../config/database.js'
import { DataTypes } from 'sequelize';
import User from './user.js';
import Book from './book.js';



// 定义模型
const Collection = sequelize.define(
    'UserBookCollections',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User,
          key: 'id'
        }
      },
      book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Book,
          key: 'id'
        }
      }
    },
    {
      tableName: 'user_book_collections', // 指定表格名称
      timestamps: false, 
    }
  )

  Collection.beforeCreate((collection, options) => {
    console.log('collection',collection)
    collection.create_time = new Date();
  });

  // 定义关联关系（可选，根据实际需求决定是否在这里定义）
    User.hasMany(Collection,{
      foreignKey: 'user_id'
    });
    Book.hasMany(Collection,{
      foreignKey: 'book_id'
    });
    Collection.belongsTo(User,{
      foreignKey: 'user_id', // 这里的外键就是前面在User模型关联时指定的同一个外键字段
      targetKey: 'id'
    });
    Collection.belongsTo(Book,{
      foreignKey: 'book_id', // 这里的外键就是前面在User模型关联时指定的同一个外键字段
      targetKey: 'id'
    });
  

export default Collection;
  