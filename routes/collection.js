import express from 'express'
import multer from 'multer'
import articleServices from '../services/article.js'
import collectionServices from '../services/collection.js'
import { resFormatter } from '../utils/index.js'

const router = express.Router()

const bodyMulter = multer({ storage: multer.memoryStorage() })

// 记录用户收藏与取消收藏
router.post('/collection', bodyMulter.none(), async (req, res) => {
  const info = Object.assign({}, req.body)
  const status = info.status
  info.user_id = req.user?.id || info.user_id
  try {
    let result
    if (info.status == '1') {
      const data = await collectionServices.createCollection(info)
      if (data) {
        await articleServices.updateCollectNum(info.article_id, status)
      }
      result = resFormatter('收藏成功')
    } else {
      const data = await collectionServices.deleCollection(info)
      if (data) {
        await articleServices.updateCollectNum(info.article_id, status)
      }
      result = resFormatter('取消收藏成功')
    }

    res.send(result)
  } catch (error) {
    console.log('这里', error)
    const result = resFormatter(error, {
      message: status == '1' ? '收藏失败' : '取消收藏失败'
    })
    res.send(result)
  }
})

// 获取用户收藏书籍
router.get('/collection', async (req, res) => {
  const query = req.query
  try {
    const page = Number.parseInt(query.page, 10) || 1
    const limit = Number.parseInt(query.pagesize, 10) || 10
    const offset = (page - 1) * limit
    const collectionData = await collectionServices.findCollectionByUserId(query.user_id, offset, limit)
    const result = resFormatter(collectionData)
    res.json(result)
  } catch (error) {
    console.log('error', error)
  }
})

export default router
