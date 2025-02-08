import express from 'express'
import mountRouters from './routes/mountRouters.js'
import mountMiddleware from './middleware/index.js'
import cors from 'cors';
import cookieParser from 'cookie-parser'

const PORT = 3300 // 用于设置端口号
const app = express() // 创建一个express应用程序实例
app.use(express.static('public'))
app.use(cookieParser());

// 或者只允许特定源的请求
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
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