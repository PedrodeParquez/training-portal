import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const uploadDir = path.join(__dirname, '../uploads');

export const ensureUploadDir = () => {
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }
};

export const generateFileName = (fieldname: string, mimetype: string): string => {
    const uniqueSuffix = uuidv4();
    const extArray = mimetype.split('/');
    const extension = extArray[extArray.length - 1];
    return `${fieldname}-${uniqueSuffix}.${extension}`;
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        ensureUploadDir();
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const filename = generateFileName(file.fieldname, file.mimetype);
        cb(null, filename);
    },
});

export const upload = multer({ storage });