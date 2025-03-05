import express from 'express'
import multer from 'multer'
import { generateToken } from '../utils/index.js'
// import { UserDb } from '../db/user.js'
import userServices  from '../services/user.js'
import bcrypt from 'bcrypt'
import { resFormatter } from '../utils/index.js'

const router = express.Router()

const bodyMulter = multer({ storage: multer.memoryStorage() }); 

//注册
router.post('/register',bodyMulter.none(), async(req, res) => {
  const userInfo = Object.assign({}, req.body);
  try {
    bcrypt.hash(userInfo.password, 10, async function(err, hash) {
        // 存储哈希后的密码到数据库
        userInfo.password = hash
        const userData  = await userServices.createUser(userInfo)
        console.log('createInfo', userData)
        const result = resFormatter('注册成功')
        res.send(result)
    });
  } catch (error) {
      console.log('error',error)
  }
})

//登录
router.post('/login',bodyMulter.none(), async(req, res) => {
  let userInfo = Object.assign({}, req.body);
    if(userInfo.phone){
      const userData  = await userServices.findUserByPhone(userInfo.phone)
      bcrypt.compare(userInfo.password, userData.password, function(err, result) {
        if(result == true){
            userInfo = {
              ...userInfo,
              id: userData.id
            }
            const token = generateToken(userInfo)
            const result = resFormatter({token})
            res.json(result)
        }else{
          const result = resFormatter('密码错误')
          res.send(result)
        }
      })
    }
    // const user = {
    //     userId: '123',
    //     username: 'name'
    //   }
    //   const token = generateToken(user)
    //   console.log(req.body,'body')
    //   res.json({
    //     token
    //   })
})

//检查登录状态
router.get('/login-status', async(req, res) => {
  const login_status = !!(req.user?.id)
  const result = resFormatter({login_status})
  res.send(result)
})

export default router