import express from 'express'
import { authenticateToken } from '../utils/index.js'


export default function mountMiddleware(app) {
  app.use(express.json()) // 支持body解析

  // 自定义中间件函数
  app.use((req, res, next) => {
    const { method, path, query, body, headers } = req
    console.log(`[${method}] ${path}`)
    if(!path.includes('login') && !path.includes('register')  && !path.includes('hello')){
      console.log('不是登录')
      authenticateToken(req, res, next)
    }else{
      next()  
    }
  })
  // app.use(authenticateToken)
}
