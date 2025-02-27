import Book from '../models/book.js'
import Tag from '../models/tag.js'
import Collection from '../models/collection.js'
import '../models/associations.js'


  // 创建记录
async function createBook(bookInfo) {
    const book = await Book.create(bookInfo)
    return book.toJSON()
  }
  
  // 查询所有记录
  async function findAllBooks(user_id,offset,limit) {
    const books = await Book.findAndCountAll({
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
        }
      ],
      attributes:[
        'id',
        'name',
        'author',
        'description',
        'cover',
        'collect_num',
        'create_time',
        // [
        //   sequelize.literal('CASE WHEN COUNT(`UserBookCollections`.`user_id`) > 0 THEN 1 ELSE 0 END'),
        //   'is_collected'
        // ]
      ],
      offset,
      limit,
      order: [['create_time','DESC']]
    })
    books.rows = books.rows.map(book =>{
      const bookJson = book.toJSON()
      const is_collected = bookJson.UserBookCollections.length ? 1:0
      delete bookJson.UserBookCollections
      return {
        ...bookJson,
        is_collected 
      }
    })
    // console.log('books',books)
    return books
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
  async function updateCollectNum(book_id,status) {
    if(status == '1'){
      await Book.increment('collect_num',{
        where: {
          id: book_id
        }
      })
    }else{
      const book = await Book.findByPk(book_id)
      if(book && book.collect_num >0){
        await Book.decrement('collect_num',{
          where: {
            id: book_id
          }
        })
      }
    }
  }
  
  export default {
    createBook,
    findAllBooks,
    updateCollectNum,
    // findUserById,
    updateBook,
    // deleteUser
  }
  