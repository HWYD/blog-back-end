import path from 'node:path'
import express from 'express'

const router = express.Router()

router.get('/response/json', (req, res) => {
  res.set('token', '123456')
  res.set('Content-Type', 'text/html')
  res.json({
    name: 'express',
    type: 'framework'
  })
})

router.get('/response/download', (req, res) => {
  // 指定文件路径
  // res.download('package.json')
  res.download(path.resolve('./package.json'))
})
export default router
