import express from 'express'
import multer from 'multer'
import tagServices  from '../services/tag.js'
import { resFormatter } from '../utils/index.js'

const router = express.Router()

const bodyMulter = multer({ storage: multer.memoryStorage() }); 

//标签列表
router.get('/tag', async(req, res) => {
    console.log('users',req.user)
    try {
        const tagData  = await tagServices.findAllTag()
        const result = resFormatter(tagData)
        res.json(result)
    } catch (error) {
        console.log('error',error)
    }
})

//新增标签
router.post('/tag', bodyMulter.none(), async(req, res) => {
    const tagInfo = Object.assign({}, req.body);
    try {
        const tagData  = await tagServices.createTag(tagInfo)
        const result = resFormatter('创建成功')
        res.send(result)
    } catch (error) {
        console.log('error',error)
    }
})

//新增标签
router.post('/book-tag', bodyMulter.none(), async(req, res) => {
    const bookTagInfo = Object.assign({}, req.body);
    console.log(bookTagInfo,typeof bookTagInfo.tag_id,Array.isArray(bookTagInfo.tag_id))
    try {
        const ret = await tagServices.deleteBookTag(bookTagInfo.book_id)
        const tagData  = await tagServices.updateBookTag(bookTagInfo)
        const result = resFormatter('打标签成功')
        res.send(result)
    } catch (error) {
        console.log('error',error)
        if(error.name = 'SequelizeUniqueConstraintError'){
            console.error('尝试插入重复的书籍 - 标签组合，以下是可能重复的数据:');
            if(Array.isArray(error.errors)){
                error.errors.forEach((err) => {
                    console.log(`书籍ID-标签ID: ${err.value}`);
                });
            }
        }else{
            console.error('插入书籍 - 标签数据时出错:', error);
        }
        const result = resFormatter(error,'打标签失败')
        res.send(result)
    }
})

export default router