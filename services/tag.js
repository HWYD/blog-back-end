import TagModel from '../models/tag.js'
import ArticleTagModel from '../models/article_tag.js'
  
  // 创建记录
async function createTag(tagInfo) {
    const tag = await TagModel.findOne({
        where:{
            name: tagInfo.name
        }
    })
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
  
  // 给博客打标签
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
    return result;
  }
  // 删除博客标签
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
  