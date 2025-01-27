import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getMessages, getUsersForSidebar} from '../controllers/message.controller.js';
import { sendMessage } from '../controllers/sendMessage.controller.js';
import { multerUploader } from '../controllers/multerUploader.js';
import { upload} from '../lib/multer.js'


const router = express.Router();

router.get('/users', protectRoute , getUsersForSidebar );

router.get('/:id', protectRoute , getMessages );

router.post('/upload-pic', protectRoute , upload.single('file'), multerUploader );

router.post('/send', protectRoute, sendMessage );


export default router;