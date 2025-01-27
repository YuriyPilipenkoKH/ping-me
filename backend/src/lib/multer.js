import multer from 'multer';

// Set up multer memory storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }); // multer middleware

export {storage , upload} 