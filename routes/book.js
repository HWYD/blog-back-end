import express from 'express'
import multer from 'multer'
import bookServices  from '../services/book.js'
import { resFormatter } from '../utils/index.js'

const router = express.Router()

const bodyMulter = multer({ storage: multer.memoryStorage() }); 

//书籍列表
router.get('/book', async(req, res) => {
    const query = req.query
    console.log('users',req.user)
    try {
        const user_id = req.user?.id || ''
        const page = Number(query.page || 1)
        const limit = Number(query.pagesize || 10)
        const offset = (page - 1) * limit
        const bookData  = await bookServices.findAllBooks(user_id,offset,limit)
        const result = resFormatter(bookData)
        res.json(result)
    } catch (error) {
        console.log('error',error)
    }
})

//新增书籍
router.post('/book', bodyMulter.none(), async(req, res) => {
    const bookInfo = Object.assign({}, req.body);
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