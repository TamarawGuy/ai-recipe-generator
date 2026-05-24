import express from 'express'
import * as chatController from '../controllers/chatController.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

router.use(authMiddleware)

router.post('/', chatController.sendMessage)

export default router
