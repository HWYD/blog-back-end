import express from 'express'
import multer from 'multer'
import articleServices  from '../services/article.js'
import { resFormatter } from '../utils/index.js'

const router = express.Router()

const bodyMulter = multer({ storage: multer.memoryStorage() }); 

//所有文章列表
router.get('/article', async(req, res) => {
    const query = req.query
    try {
        const user_id = req.user?.id || ''
        const page = Number(query.page || 1)
        const limit = Number(query.pagesize || 10)
        const offset = page - 1
        const bookData  = await articleServices.findAllArticles(user_id,offset,limit)
        const result = resFormatter(bookData)
        res.json(result)
    } catch (error) {
        console.log('error',error)
    }
})

//某个用户的文章列表
router.get('/self_article', async(req, res) => {
    const query = req.query
    try {
        const user_id = query.user_id || req.user?.id || ''
        const page = Number(query.page || 1)
        const limit = Number(query.pagesize || 10)
        const offset = (page - 1) * limit
        const bookData  = await articleServices.findSelfArticles(user_id,offset,limit)
        const result = resFormatter(bookData)
        res.json(result)
    } catch (error) {
        console.log('error',error)
    }
})

//某个用户收藏的文章列表
router.get('/collect_article', async(req, res) => {
    const query = req.query
    try {
        const user_id = query.user_id || req.user?.id || ''
        const page = Number(query.page || 1)
        const limit = Number(query.pagesize || 10)
        const offset = (page - 1) * limit
        const bookData  = await articleServices.findCollectArticles(user_id,offset,limit)
        const result = resFormatter(bookData)
        res.json(result)
    } catch (error) {
        console.log('error',error)
    }
})

//获取某篇文章
router.get('/article_one', async(req, res) => {
    const query = req.query
    try {
        const user_id = query.user_id || req.user?.id || ''
        const id = query.id || ''
        const bookData  = await articleServices.findArticleById(id,user_id)
        const result = resFormatter(bookData)
        res.json(result)
    } catch (error) {
        console.log('error',error)
    }
})

//新增文章
router.post('/article', bodyMulter.none(), async(req, res) => {
    const user_id = req.user?.id || ''
    const articleInfo = Object.assign({}, req.body, {user_id});
    try {
        const articleData  = await articleServices.createArticle(articleInfo)
        const result = resFormatter('创建成功')
        res.send(result)
    } catch (error) {
        console.log('error',error)
    }
})


export default router