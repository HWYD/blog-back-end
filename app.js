import express from 'express'
import mountRouters from './routes/mountRouters.js'
import mountMiddleware from './middleware/index.js'
import cors from 'cors';
import cookieParser from 'cookie-parser'
import path from 'path'
import { fileURLToPath } from 'url'
// 配置路径解析
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = 3300 // 用于设置端口号
const app = express() // 创建一个express应用程序实例

// 静态资源服务
const resourceDir = path.join(__dirname, '../blog-resource')
app.use('/resources', express.static(resourceDir))
app.use(express.static('public'))
app.use(cookieParser());

// 或者只允许特定源的请求
app.use(cors({
  origin: ['http://localhost:3000','http://8.138.28.97:3000','http://8.138.28.97','http://www.hwyblog.cloud'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization','X-Requested-With'],
  credentials: true,
}));

// app.use(responseFormatter)

mountMiddleware(app)

// mountMethodDemo(app)
mountRouters(app)


app.listen(PORT, '0.0.0.0',() => {
    // 在控制台输出服务器运行信息
    console.log(`Server is running at http://localhost:${PORT}`)
  })