import express from 'express'
const router = express.Router()
import bookServices  from '../services/book.js'
import { resFormatter } from '../utils/index.js'

//书籍列表
router.get('/book', async(req, res) => {
    const query = req.query
    try {
        const bookData  = await bookServices.findAllBooks()
        const result = resFormatter(bookData)
        res.json(result)
    } catch (error) {
        console.log('error',error)
    }
})

//新增书籍
router.post('/book', async(req, res) => {
    const { body } = req
    const bookInfo = body
    try {
        const bookData  = await bookServices.createBook(bookInfo)
        console.log('createInfo', bookData)
        const result = resFormatter('创建成功')
        res.send(result)
    } catch (error) {
        console.log('error',error)
    }
})

//编辑书籍
router.put('/book', async(req, res) => {
    const { body } = req
    const bookInfo = body
    try {
        const bookData  = await bookServices.updateBook(bookInfo)
        console.log('createInfo', bookData)
        const result = resFormatter('创建成功')
        res.send(result)
    } catch (error) {
        console.log('error',error)
    }
})

// //删除用户
// router.delete('/user', async(req, res) => {
//     const { params,query } = req
//     try {
//         console.log(params,query)
//         const ret = await UserDb.deleteUser(query.id)
//         if(ret){
//             const result = resFormatter('删除成功')
//             res.send(result)
//         }else{
//             const result = resFormatter('删除失败')
//             res.send(result)
//         }
//     } catch (error) {
//         console.log('error',error)
//     }
// })
export default router