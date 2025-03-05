import Article from '../models/article.js'
import Tag from '../models/tag.js'
import Collection from '../models/collection.js'
import User from '../models/user.js'
import ArticleTagModel from '../models/article_tag.js'
import '../models/associations.js'

  // 创建记录
async function createArticle(articleInfo) {
    const article = await Article.create(articleInfo)
    const articleData = article.toJSON()
    // 步骤 1: 删除文章之前的所有标签
    await ArticleTagModel.destroy({
      where: {
          article_id: articleData.id
      }
     });
    const articleTagSet = [...new Set(articleInfo.tags)];
    const articleTagData = articleTagSet.map(tag_id=>({
      article_id: articleData.id,
      tag_id
    }))
    await ArticleTagModel.bulkCreate(articleTagData);  //批量操作标签
    return articleData
  }
  
  // 查询所有记录
  async function findAllArticles(user_id,offset,limit) {
    const articles = await Article.findAndCountAll({
      include: [
        {
          model: Collection,
          attributes: ['user_id'],
          where: {
            user_id
          },
          distinct: true,
          required: false   //左外连接, 没有找到与 Book 模型中某条记录相匹配的记录（也就是某本书没有对应的收藏记录），仍然会返回 Book 模型中的那条记录
        },
        {
          model: Tag,
          through: {
            attributes: []
          }
        },
        {
          model: User,
          attributes: ['name']
      }
      ],
      attributes:[
        'id',
        'title',
        'description',
        'cover',
        'collect_num',
        'view_num',
        'create_time',
        'user_id'
        // [
        //   sequelize.literal('CASE WHEN COUNT(`UserBookCollections`.`user_id`) > 0 THEN 1 ELSE 0 END'),
        //   'is_collected'
        // ]
      ],
      offset,
      limit,
      order: [['create_time','DESC']]
    })
    articles.rows = articles.rows.map(article =>{
      const articlesJson = article.toJSON()
      const is_collected = articlesJson.UserArticleCollections.length ? 1:0
      const author = articlesJson.User.name
      delete articlesJson.UserArticleCollections
      delete articlesJson.User
      return {
        ...articlesJson,
        author,
        is_collected
      }
    })
    articles.login_status = !!user_id
    // console.log('books',books)
    return articles
  }

  // 查询某个用户下的记录
  async function findSelfArticles(user_id,offset,limit) {
    // console.log('offset limit',user_id,offset,limit)
    const articles = await Article.findAndCountAll({
      where:{
        user_id
      },
      include: [
        {
          model: Collection,
          attributes: ['user_id'],
          where: {
            user_id
          },
          distinct: true,
          required: false   //左外连接, 没有找到与 Book 模型中某条记录相匹配的记录（也就是某本书没有对应的收藏记录），仍然会返回 Book 模型中的那条记录
        },
        {
          model: Tag,
          through: {
            attributes: []
          }
        },
        {
          model: User,
          attributes: ['name']
      }
      ],
      attributes:[
        'id',
        'title',
        'description',
        'content',
        'cover',
        'collect_num',
        'view_num',
        'create_time',
        'user_id'
        // [
        //   sequelize.literal('CASE WHEN COUNT(`UserBookCollections`.`user_id`) > 0 THEN 1 ELSE 0 END'),
        //   'is_collected'
        // ]
      ],
      offset,
      limit,
      order: [['create_time','DESC']]
    })
    // console.log(articles.rows,articles,Array.isArray(articles.rows))
    articles.rows = articles.rows.map(article =>{
      const articlesJson = article.toJSON()
      const is_collected = articlesJson.UserArticleCollections.length ? 1:0
      const author = articlesJson.User.name
      delete articlesJson.UserArticleCollections
      delete articlesJson.User
      return {
        ...articlesJson,
        author,
        is_collected
      }
    })
    return articles
  }

  // 查询某个用户收藏的记录
  async function findCollectArticles(user_id,offset,limit) {
    const articles = await Article.findAndCountAll({
      where:{
        user_id
      },
      include: [
        {
          model: Collection,
          attributes: ['user_id'],
          where: {
            user_id
          },
          distinct: true,
          required: true   //左外连接, 没有找到与 Article 模型中某条记录相匹配的记录（也就是某本书没有对应的收藏记录），仍然会返回 Article 模型中的那条记录
        },
        {
          model: Tag,
          through: {
            attributes: []
          }
        },
        {
          model: User,
          attributes: ['name']
      }
      ],
      attributes:[
        'id',
        'title',
        'description',
        'content',
        'cover',
        'collect_num',
        'view_num',
        'create_time',
        'user_id'
        // [
        //   sequelize.literal('CASE WHEN COUNT(`UserBookCollections`.`user_id`) > 0 THEN 1 ELSE 0 END'),
        //   'is_collected'
        // ]
      ],
      offset,
      limit,
      order: [['create_time','DESC']]
    })
    // console.log(articles.rows,articles,Array.isArray(articles.rows))
    articles.rows = articles.rows.map(article =>{
      const articlesJson = article.toJSON()
      const is_collected = articlesJson.UserArticleCollections.length ? 1:0
      const author = articlesJson.User.name
      delete articlesJson.UserArticleCollections
      delete articlesJson.User
      return {
        ...articlesJson,
        author,
        is_collected
      }
    })
    return articles
  }

  // 根据 id 查询记录
  async function findArticleById(id) {
    const article = await Article.findByPk(id, {
      include: {
        model: User,
        attributes: ['name'] // 只查询用户名
      }
    })
    if (!article) {
      return null
    }
    // 增加浏览量
    await article.increment('view_num', { by: 1 });
    // 重新加载文章以获取最新的浏览量
    await article.reload();
    const ret = {
      ...article?.toJSON()
    }
    if(article){
      ret['author'] = article.User.name
    }
    
    return ret
  }
  
  // 更新记录
  async function updateArticle(articleInfo) {
    const article = await Article.findByPk(articleInfo.id)
    if (article) {
      article.name = articleInfo.name || article.name
      article.desc = articleInfo.desc || article.desc
      article.price = articleInfo.price || article.price
      await article.save()
    } else {
      console.log('Book not found')
    }
    return article
  }
  
  // // 删除记录
  // async function deleteUser(id) {
  //   const user = await User.findByPk(id)
  //   if (user) {
  //     await user.destroy()
  //   } else {
  //     console.log('User not found')
  //   }
  //   return user
  // }

// 更新文章收藏数量
  async function updateCollectNum(article_id,status) {
    if(status == '1'){
      await Article.increment('collect_num',{
        where: {
          id: article_id
        }
      })
    }else{
      const article = await Article.findByPk(article_id)
      if(article && article.collect_num >0){
        await Article.decrement('collect_num',{
          where: {
            id: article_id
          }
        })
      }
    }
  }
  
  export default {
    createArticle,
    findAllArticles,
    updateCollectNum,
    findArticleById,
    updateArticle,
    findSelfArticles,
    findCollectArticles
  }
  