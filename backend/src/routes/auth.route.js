import express from 'express';
import { checkAuth, login, logout, signup, updateProfile} from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import { uploadImage } from '../controllers/uploadImage.js';



const router = express.Router();

router.post('/signup', signup );

router.post('/login', login );

router.post('/logout', logout );

router.put('/update-profile', protectRoute, updateProfile );
router.put('/upload', protectRoute, uploadImage );

router.get('/check', protectRoute, checkAuth)



export default router;