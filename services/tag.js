import TagModel from '../models/tag.js'
import BookTagModel from '../models/book_tag.js'
import ArticleTagModel from '../models/article_tag.js'
import { where } from 'sequelize'
import article from './article.js'

  
  // 创建记录
async function createTag(tagInfo) {
    const tag = await TagModel.findOne({
        where:{
            name: tagInfo.name
        }
    })
    console.log(tag)
    if(tag){
        return null
    }else{
        const tag = await TagModel.create(tagInfo)
        return tag.toJSON()
    }
  }
  
  // 查询所有记录
  async function findAllTag() {
    const tags = await TagModel.findAll({
        order: [['create_time','DESC']]
    })
    return tags.map(tag => tag.toJSON())
  }
  
  // 给书籍打标签
  async function updateArticleTag(articleTagInfo) {
    const articleTagData = [];
    const articleTagSet = [...new Set(articleTagInfo.tag_id)];
    articleTagSet.forEach(tag_id =>{
      articleTagData.push({
            ...articleTagInfo,
            tag_id
        })
    })
    console.log('articleTagData',articleTagData)
    const result = await ArticleTagModel.bulkCreate(articleTagData);
    console.log('成功插入的书籍 - 标签记录数量:', result.length);
    return result;
  }
  // 删除书籍标签
  async function deleteArticleTag(article_id) {
    const ret = await ArticleTagModel.destroy({
        where: {
            article_id
        }
    })
    console.log('retddd',ret)
    return ret
  }
  
  // // 删除记录
  // async function deleteUser(id) {
  //   const user = await User.findByPk(id)
  //   if (user) {
  //     await user.destroy()
  //     console.log('User deleted')
  //   } else {
  //     console.log('User not found')
  //   }
  //   return user
  // }

  export default {
    createTag,
    findAllTag,
    updateArticleTag,
    deleteArticleTag
  }
  