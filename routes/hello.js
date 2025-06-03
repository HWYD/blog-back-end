import express from 'express'

const router = express.Router()

// hello
router.get('/hello', async (req, res) => {
  try {
    res.send('hello world!')
  } catch (error) {
    console.log('error', error)
  }
})

export default router
