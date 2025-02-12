import express from 'express'
import multer from 'multer'
import articleServices  from '../services/article.js'
import { resFormatter } from '../utils/index.js'

const router = express.Router()

const bodyMulter = multer({ storage: multer.memoryStorage() }); 

//书籍列表
router.get('/article', async(req, res) => {
    const query = req.query
    console.log('users',req.user)
    try {
        const user_id = req.user?.id || ''
        const page = Number(query.page || 1)
        const limit = Number(query.pagesize || 10)
        const offset = (page - 1) * limit
        const bookData  = await articleServices.findAllArticles(user_id,offset,limit)
        const result = resFormatter(bookData)
        res.json(result)
    } catch (error) {
        console.log('error',error)
    }
})

//新增书籍
router.post('/article', bodyMulter.none(), async(req, res) => {
    const user_id = req.user?.id || ''
    const articleInfo = Object.assign({}, req.body, {user_id});
    console.log(articleInfo)
    try {
        const articleData  = await articleServices.createArticle(articleInfo)
        console.log('createInfo', articleData)
        const result = resFormatter('创建成功')
        res.send(result)
    } catch (error) {
        console.log('error',error)
    }
})


export default router