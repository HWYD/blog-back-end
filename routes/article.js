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
        const offset = (page - 1) * limit
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
        const user_phone = req.user?.phone || ''
        const id = query.id || ''
        const articleData  = await articleServices.findArticleById(id,user_id,user_phone)
        const result = resFormatter(articleData)
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
        let result
        if(articleInfo.id){
            const articleData  = await articleServices.updateArticle(articleInfo)
            result = resFormatter('更新成功')
        }else{
            const articleData  = await articleServices.createArticle(articleInfo)
            result = resFormatter('创建成功')
        }
        res.send(result)
    } catch (error) {
        console.log('error',error)
    }
})
//删除用户
router.delete('/article', async(req, res) => {
    const { params,query } = req
    try {
        console.log(params,query)
        const ret = await articleServices.deleteArticle(query.id)
        if(ret){
            const result = resFormatter('删除成功')
            res.send(result)
        }else{
            const result = resFormatter('删除失败')
            res.send(result)
        }
    } catch (error) {
        console.log('error',error)
    }
})

export default router