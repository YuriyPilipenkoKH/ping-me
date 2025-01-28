import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getMessages, getUsersForSidebar} from '../controllers/message.controller.js';
import {  sendText } from '../controllers/sendText.controller.js';
import { sendMessage} from '../controllers/sendMessage.controller.js';
import { upload} from '../lib/multer.js'


const router = express.Router();

router.get('/users', protectRoute , getUsersForSidebar );

router.get('/:id', protectRoute , getMessages );

router.post('/send-message/:id', protectRoute , upload.single('file'),  sendMessage );

router.post('/send/:id', protectRoute, sendText );


export default router;