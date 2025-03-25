import express from 'express'
const router = express.Router()
import userServices from '../services/user.js'
import { resFormatter } from '../utils/index.js'

//用户列表
router.get('/user', async (req, res) => {
    const query = req.query
    try {
        const page = parseInt(query.page, 10) || 1
        const limit = parseInt(query.pagesize, 10) || 10
        const offset = (page - 1) * limit
        const userData = await userServices.findAllUsers(offset, limit)
        const result = resFormatter(userData)
        res.json(result)
    } catch (error) {
        console.log('error', error)
    }
})

//新增用户
router.post('/user', async (req, res) => {
    const { body } = req
    const userInfo = body
    try {
        const userData = await userServices.createUser(userInfo)
        const result = resFormatter('创建成功')
        res.send(result)
    } catch (error) {
        console.log('error', error)
    }
})

//删除用户
router.delete('/user', async (req, res) => {
    const { params, query } = req
    try {
        console.log(params, query)
        const ret = await userServices.deleteUser(query.id)
        if (ret) {
            const result = resFormatter('删除成功')
            res.send(result)
        } else {
            const result = resFormatter('删除失败')
            res.send(result)
        }
    } catch (error) {
        console.log('error', error)
    }
})

//编辑用户
router.put('/user', async (req, res) => {
    const { body } = req
    const userInfo = body
    try {
        const userData = await userServices.updateUser(userInfo)
        const result = resFormatter('创建成功')
        res.send(result)
    } catch (error) {
        console.log('error', error)
    }
})
export default router