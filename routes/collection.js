import express from 'express'
const router = express.Router()
import collectionServices from '../services/collection.js'
import bookServices from '../services/book.js'
import { resFormatter } from '../utils/index.js'

//记录用户收藏
router.post('/collection', async(req, res) => {
    const {body} = req
    const info = body
    try {
        const data  = await collectionServices.createCollection(info)
        console.log(data,body,'test',info.book_id)
        await bookServices.updateCollectNum(info.book_id)  
        const result = resFormatter('收藏成功')
        res.send(result)
    } catch (error) {
        console.log('这里',error)
        const result = resFormatter(error,'收藏失败')
        res.send(result)
        // console.log('error',error)
    }
})

// 获取用户收藏书籍
router.get('/collection', async(req, res) => {
    const query = req.query
    try {
        console.log(query)
        const page = Number(query.page) || 1
        const limit = Number(query.pagesize) || 0
        const offset = (page - 1) * limit
        const collectionData  = await collectionServices.findCollectionByUserId(query.user_id,offset,limit)
        const result = resFormatter(collectionData)
        res.json(result)
    } catch (error) {
        console.log('error',error)
    }
})


export default router