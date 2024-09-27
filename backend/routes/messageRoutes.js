import express from 'express';
import { sendMessage,getMessages } from '../controllers/messagecontroller.js';
const router=express.Router();
router.get("/:id",getMessages)
router.post('/send/:id',sendMessage)
export default router;