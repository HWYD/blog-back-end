import sequelize from '../config/database.js'
import { DataTypes } from 'sequelize';
import User from './user.js';
import Article from './article.js';


// 定义模型
const Collection = sequelize.define(
    'UserArticleCollections',
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
      article_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Article,
          key: 'id'
        }
      }
    },
    {
      tableName: 'user_article_collections', // 指定表格名称
      timestamps: false, 
    }
  )

  Collection.beforeCreate((collection, options) => {
    collection.create_time = new Date();
  });

export default Collection;
  