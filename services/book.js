import Book from '../models/book.js'
  
  // 创建记录
async function createBook(bookInfo) {
    const book = await Book.create(bookInfo)
    return book.toJSON()
  }
  
  // 查询所有记录
  async function findAllBooks(user_id) {
    const books = await Book.findAll({
      // include: [
      //   {
      //     model: CollectionDb.Collection,
      //     attributes: [],
      //     where: {
      //       user_id
      //     },
      //     required: false
      //   }
      // ],
      // attributes:[
      //   '*',
      //   [
      //     sequelize.literal('CASE WHEN "userBookCollections"."user_id" IS NOT NULL THEN 1 ELSE 0 END'),
      //     'is_collected'
      //   ]
      // ]
    })
    return books.map((book) => book.toJSON())
  }
  
  // 根据 id 查询记录
  // async function findUserById(id) {
  //   const user = await User.findByPk(id)
  //   return user?.toJSON()
  // }
  
  // 更新记录
  async function updateBook(bookInfo) {
    const book = await Book.findByPk(bookInfo.id)
    if (book) {
      book.name = bookInfo.name || book.name
      book.desc = bookInfo.desc || book.desc
      book.price = bookInfo.price || book.price
      await book.save()
      console.log(book.toJSON())
    } else {
      console.log('Book not found')
    }
    return book
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

// 更新书籍收藏数量
  async function updateCollectNum(book_id,type) {
    await Book.increment('collect_num',{
      where: {
        id: book_id
      }
    })
  }
  
  export default {
    createBook,
    findAllBooks,
    updateCollectNum,
    // findUserById,
    updateBook,
    // deleteUser
  }
  