import CollectionModel from "../models/collection.js"
import Book from "../models/book.js"

  
  // 创建记录
async function createCollection(info) {
      const collection = await CollectionModel.findOne({
        where: {
          user_id: info.user_id,
          article_id: info.article_id
        }
      })
      if(!collection){
        const newCollection = await CollectionModel.create(info)
        return newCollection.toJSON()
      }
      
      return null
  }
  
  // 查询所有记录
  // async function findAllBooks() {
  //   const books = await Book.findAll()
  //   return books.map((book) => book.toJSON())
  // }
  
//   // 根据 用户id 查询该收藏记录
  async function findCollectionByUserId(user_id,offset,limit) {
     const userCollections  = await CollectionModel.findAll({
      where: {
          user_id
      },
      include: [
        {
          model: Book,
          attributes: ['title','description','content','cover']
        }
      ],
      offset,
      limit,
      order: [['create_time', 'DESC']]
     })
      if (userCollections) {
        // console.log('collection',userCollections,ret)
        const ret = userCollections.map((collection) =>({
          id: collection.id,
          user_id: collection.user_id,
          article_id: collection.article_id,
          ...collection.Book.toJSON()
        }))
        return ret
      } else {
          console.log('没有查到');
      }
  }
  
//   // 更新记录
//   async function updateBook(bookInfo) {
//     const book = await Book.findByPk(bookInfo.id)
//     if (book) {
//       book.name = bookInfo.name || book.name
//       book.desc = bookInfo.desc || book.desc
//       book.price = bookInfo.price || book.price
//       await book.save()
//       console.log(book.toJSON())
//     } else {
//       console.log('Book not found')
//     }
//     return book
//   }
  
  // 删除收藏记录
  async function deleCollection(info) {
    const collection = await CollectionModel.findOne({
      where: {
        user_id: info.user_id,
        article_id: info.article_id
      }
    })
    if (collection) {
      const destroyCollection = await collection.destroy()
      return destroyCollection
    } else {
      return null
    }
  }
  
  export default {
    createCollection,
    findCollectionByUserId,
    deleCollection,
    // updateBook,
    // deleteUser
  }
  