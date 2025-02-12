import sequelize from '../config/database.js'
import { DataTypes } from 'sequelize';
import Tag from './tag.js';
import Article from './article.js';

// 定义模型
const ArticleTag = sequelize.define(
    'ArticleTag',
    {
    //   id: {
    //     type: DataTypes.INTEGER,
    //     primaryKey: true,
    //     allowNull: false
    //   },
      article_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Article',
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
      tableName: 'article_tag', // 指定表格名称
      timestamps: true, // 禁止 Sequelize 自动生成 createdAt 和 updatedAt 字段
      createdAt: 'create_time',
      updatedAt: 'update_time',
      indexes: [
        {
            unique: true,
            fields: ['article_id', 'tag_id']
        }
    ]
    }
  )

export default ArticleTag;

  