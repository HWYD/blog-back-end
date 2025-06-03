import path from 'node:path'
import { fileURLToPath } from 'node:url'
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'

// 获取当前模块路径
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 定位到项目根目录的上级
const projectRoot = path.resolve(__dirname, '../..')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('94646')
    cb(null, path.join(projectRoot, 'blog-resource/images'))
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    cb(null, `${Date.now()}-${uuidv4().slice(0, 8)}${ext}`)
  }
})

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    console.log('116162')
    const allowedTypes = ['image/jpeg', 'image/png']
    allowedTypes.includes(file.mimetype)
      ? cb(null, true)
      : cb(new Error('只支持 JPG/PNG 格式'), false)
  },
  limits: { fileSize: 10 * 1024 * 1024 }
})

export default upload
