import Collection from './collection.js'
import User from './user.js'
import Tag from './tag.js'
import ArticleTag from './article_tag.js'
import Article from './article.js'


// 定义关联关系（可选，根据实际需求决定是否在这里定义）
User.hasMany(Collection,{
    foreignKey: 'user_id'
  });
  Article.hasMany(Collection,{
    foreignKey: 'article_id'
  });
  Collection.belongsTo(User,{
    foreignKey: 'user_id', // 这里的外键就是前面在User模型关联时指定的同一个外键字段
    targetKey: 'id'
  });
  Collection.belongsTo(Article,{
    foreignKey: 'article_id', // 这里的外键就是前面在User模型关联时指定的同一个外键字段
    targetKey: 'id'
  });

// 定义文章与标签的多对多关联关系
// 定义关联关系（可选，根据实际需求决定是否在这里定义）
Article.belongsToMany(Tag, {
  through: {
    model: ArticleTag,
    uniqueKey: 'article_tag_unique',
    attributes: []
  },
  foreignKey: {
    name: 'article_id',
    references: {
        model: 'Article',
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

 Article.hasMany(ArticleTag,{
    foreignKey: 'article_id'
  });
  Tag.hasMany(ArticleTag,{
    foreignKey: 'tag_id'
  });
  ArticleTag.belongsTo(Article,{
    foreignKey: 'article_id', 
    targetKey: 'id'
  });
  ArticleTag.belongsTo(Tag,{
    foreignKey: 'tag_id', 
    targetKey: 'id'
  });

  Tag.belongsToMany(Article, {    //不写，查不出书籍列表项所带的标签
    through: {
        model: ArticleTag,
        uniqueKey: 'article_tag_unique',
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
        name: 'article_id',
        references: {
            model: 'Article',
            key: 'id'
        }
    }
});


// Article.belongsToMany(Tag, {
//   through: {
//     model: ArticleTag,
//     attributes: []
//   },
//   foreignKey: {
//     name: 'article_id',
//     references: {
//       model: Article,
//       key: 'id'
//     }
//   },
//   otherForeignKey: {
//     name: 'tag_id',
//     references: {
//       model: Tag,
//       key: 'id'
//     }
//   }
// });

// Article.hasMany(ArticleTag, { foreignKey: 'article_id' });
// Tag.hasMany(ArticleTag, { foreignKey: 'tag_id' });
// ArticleTag.belongsTo(Article, { foreignKey: 'article_id', targetKey: 'id' });
// ArticleTag.belongsTo(Tag, { foreignKey: 'tag_id', targetKey: 'id' });

//文章与用户
// 一篇文章属于一个用户
Article.belongsTo(User, { foreignKey: 'user_id',targetKey: 'id' });
// 一个用户可以有多篇文章
User.hasMany(Article, { foreignKey: 'user_id' });


  console.log('天气')


//   export default {
//     Article
//   }