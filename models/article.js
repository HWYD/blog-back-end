import sequelize from '../config/database.js'
import { DataTypes } from 'sequelize';
import Tag from './tag.js'

// import paginate from 'sequelize-paginate';

// 定义模型
const Article = sequelize.define(
    'Article',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING(200),
        allowNull: false
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      cover: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      published: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
      },
      collect_num: {
        type: DataTypes.INTEGER(10),
        defaultValue: 0,
        allowNull: true
      },
      view_num: {
        type: DataTypes.INTEGER(10),
        defaultValue: 0,
        allowNull: true
      }
    },
    {
      tableName: 'article', // 指定表格名称
      timestamps: true, // 禁止 Sequelize 自动生成 createdAt 和 updatedAt 字段
      createdAt: 'create_time',
      updatedAt: 'update_time'
    }
  )
  
// paginate.paginate(Book);

// 定义书籍与标签的多对多关联关系
// Book.belongsToMany(Tag, {
//   through: 'book_tag',
//   foreignKey: {
//     name: 'book_id',
//     references: {
//         model: 'Book',
//         key: 'id'
//     }
//   },
//   otherForeignKey: {
//     name: 'tag_id',
//     references: {
//         model: 'Tag',
//         key: 'id'
//     }
//   }
// });


export default Article;

  