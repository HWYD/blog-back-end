import Book from './book.js'
import Collection from './collection.js'
import User from './user.js'
import Tag from './tag.js'
import BookTag from './book_tag.js'

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

// 定义书籍与标签的多对多关联关系
// 定义关联关系（可选，根据实际需求决定是否在这里定义）
Book.belongsToMany(Tag, {
  through: {
    model: BookTag,
    uniqueKey: 'book_tag_unique',
    attributes: []
  },
  foreignKey: {
    name: 'book_id',
    references: {
        model: 'Book',
        key: 'id'
    }
  },
  otherForeignKey: {
    name: 'tag_id',
    references: {
        model: 'Tag',
        key: 'id'
    }
  }
});

 Book.hasMany(BookTag,{
    foreignKey: 'book_id'
  });
  Tag.hasMany(BookTag,{
    foreignKey: 'tag_id'
  });
  BookTag.belongsTo(Book,{
    foreignKey: 'book_id', // 这里的外键就是前面在User模型关联时指定的同一个外键字段
    targetKey: 'id'
  });
  BookTag.belongsTo(Tag,{
    foreignKey: 'tag_id', // 这里的外键就是前面在User模型关联时指定的同一个外键字段
    targetKey: 'id'
  });


Tag.belongsToMany(Book, {    //不写，查不出书籍列表项所带的标签
    through: {
        model: BookTag,
        uniqueKey: 'book_tag_unique',
        attributes: []
    },
    foreignKey: {
        name: 'tag_id',
        references: {
            model: 'Tag',
            key: 'id'
        }
    },
    otherForeignKey: {
        name: 'book_id',
        references: {
            model: 'Book',
            key: 'id'
        }
    }
});

  console.log('天气')


//   export default {
//     Book
//   }