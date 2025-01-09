import express from 'express'
import { generateToken } from '../utils/index.js'
// import { UserDb } from '../db/user.js'
import userServices  from '../services/user.js'
import bcrypt from 'bcrypt'
import { resFormatter } from '../utils/index.js'

const router = express.Router()


//注册
router.post('/register', async(req, res) => {
  const { body } = req
  console.log('body',body)
  const userInfo = body
  try {
    bcrypt.hash(userInfo.password, 10, async function(err, hash) {
        // 存储哈希后的密码到数据库
        console.log('hash',hash)
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
router.post('/login', async(req, res) => {
    const body = req.body
    let userInfo = body
    if(userInfo.phone){
      const userData  = await userServices.findUserByPhone(userInfo.phone)
      console.log(userData)
      bcrypt.compare(userInfo.password, userData.password, function(err, result) {
        if(result == true){
            userInfo = {
              ...userInfo,
              id: userData.id
            }
            const token = generateToken(userInfo)
            console.log(req.body,'body')
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

export default router