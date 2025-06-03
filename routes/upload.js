import fs from 'node:fs/promises'
import express from 'express'
import sharp from 'sharp'
import upload from '../middleware/upload.js'
// import multer from 'multer'

const router = express.Router()

// const bodyMulter = multer({ storage: multer.memoryStorage() });

// 标签列表
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    console.log('upload1', req.file)
    // 1. 基础验证
    if (!req.file) return res.status(400).json({ error: '未收到文件' })

    // 2. 处理图片
    const processedImage = await sharp(req.file.path)
      .resize({ width: 2000, withoutEnlargement: true })
      .rotate()
      .webp({ quality: 85 })
      .toBuffer()
    // 3. 覆盖原始文件
    // await fs.writeFile(req.file.path, processedImage)

    // 4. 获取图片元数据
    const metadata = await sharp(processedImage).metadata()
    console.log('metadata', metadata)

    // 5. 存储到数据库
    // const imageRecord = await Image.create({
    //   filename: req.file.filename,
    //   path: `/images/${req.file.filename}`,
    //   width: metadata.width,
    //   height: metadata.height,
    //   size: Buffer.byteLength(processedImage),
    //   mimeType: 'image/webp',
    //   articleId: req.body.articleId // 关联文章ID（可选）
    // })

    // 6. 返回结果
    res.json({
      //   url: `${process.env.FILE_BASE_URL}${imageRecord.path}`,
      url: `/resources/images/${req.file.filename}`,
      //   id: imageRecord.id,
      dimensions: { width: metadata.width, height: metadata.height }
    })

    // res.json(result)
  } catch (error) {
    // 7. 错误处理
    if (req.file) await fs.unlink(req.file.path)
    res.status(500).json({ error: error.message })
  }
})

export default router
