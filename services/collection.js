import Collection from "../models/collection.js"
import Book from "../models/book.js"

  
  // 创建记录
async function createCollection(info) {
      const book = await Collection.create(info)
      return book.toJSON()
  }
  
  // 查询所有记录
  // async function findAllBooks() {
  //   const books = await Book.findAll()
  //   return books.map((book) => book.toJSON())
  // }
  
//   // 根据 用户id 查询该收藏记录
  async function findCollectionByUserId(user_id,offset,limit) {
    console.log(offset,limit, typeof offset,'test')
     const userCollections  = await Collection.findAll({
      where: {
          user_id
      },
      include: [
        {
          model: Book,
          attributes: ['name','description','author','cover']
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
          book_id: collection.book_id,
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
  
//   // 删除记录
//   async function deleteUser(id) {
//     const user = await User.findByPk(id)
//     if (user) {
//       await user.destroy()
//       console.log('User deleted')
//     } else {
//       console.log('User not found')
//     }
//     return user
//   }
  
  export default {
    createCollection,
    findCollectionByUserId,
    // findUserById,
    // updateBook,
    // deleteUser
  }
  