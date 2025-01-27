import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getMessages, getUsersForSidebar, sendMessage } from '../controllers/message.controller.js';
import { uploadPic } from '../controllers/uploadPic.controller.js';

const router = express.Router();

router.get('/users', protectRoute , getUsersForSidebar );

router.get('/:id', protectRoute , getMessages );

router.post('/send/:id', protectRoute , sendMessage );

router.put('/upload-pic', protectRoute, uploadPic );


export default router;