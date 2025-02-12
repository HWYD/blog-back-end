import responseRouter from './response.js'
import loginRouter from './login.js'
import userRouter from './user.js'
import bookRouter from './book.js'
import collectionRouter from './collection.js'
import tagRouter from './tag.js'
import articleRouter from './article.js'
import helloRouter from './hello.js'



const routers = [loginRouter,responseRouter,userRouter,bookRouter,collectionRouter,tagRouter,articleRouter,helloRouter]

export default function mountRouters(app) {
    // mountMethodDemo(app)
    app.use(routers)

    // 将 demoRouter 路由注册到 /demo 路径下，路由会自动拼接上 /demo 前缀
    // app.use('/demo', demoRouter)

    // app.use('/api', restfulRouter)

    // app.get('/hello/:id', (req, res) => {
    //     const { params } = req
    //     console.log('params', params)
    //     res.json(params)
    //   })
      // 创建一个 GET /hello 路由
    // app.get('/hello', (req, res) => {
    //     // 返回一个包含 "Hello World" 的 H1 标题的响应
    //     //   res.send('<h1>Hello World</h1>')
    //     res.send('<h1>Hello Express</h1>')
    // })
}
