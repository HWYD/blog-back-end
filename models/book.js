import sequelize from '../config/database.js'
import { DataTypes } from 'sequelize';
import Tag from './tag.js'

// import paginate from 'sequelize-paginate';

// 定义模型
const Book = sequelize.define(
    'Book',
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
      description: {
        type: DataTypes.TEXT(500),
        allowNull: false
      },
      author: {
        type: DataTypes.CHAR(40),
        allowNull: false
      },
      price: {
        type: DataTypes.DECIMAL(10),
        allowNull: false
      },
      cover: {
        type: DataTypes.CHAR(255),
        allowNull: false
      },
      cover: {
        type: DataTypes.CHAR(255),
        allowNull: false
      },
      collect_num: {
        type: DataTypes.INTEGER(50),
        allowNull: true
      }
    },
    {
      tableName: 'book', // 指定表格名称
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


export default Book;

  