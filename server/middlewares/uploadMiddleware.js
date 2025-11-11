import multer from 'multer';
import path from 'path';
import fs from 'fs';
  
// Ensure the upload directory exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}


// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const extension = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
    },
});
const upload = multer({ storage });

export default upload;
