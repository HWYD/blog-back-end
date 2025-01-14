import TagModel from '../models/tag.js'
import BookTagModel from '../models/book_tag.js'
import { where } from 'sequelize'

  
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
  async function updateBookTag(bookTagInfo) {
    const bookTagData = [];
    const bookTagSet = [...new Set(bookTagInfo.tag_id)];
    bookTagSet.forEach(tag_id =>{
        bookTagData.push({
            ...bookTagInfo,
            tag_id
        })
    })
    console.log(bookTagData)
    const result = await BookTagModel.bulkCreate(bookTagData);
    console.log('成功插入的书籍 - 标签记录数量:', result.length);
    return result;
  }
  // 删除书籍标签
  async function deleteBookTag(book_id) {
    const ret = await BookTagModel.destroy({
        where: {
            book_id
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
    updateBookTag,
    deleteBookTag
  }
  