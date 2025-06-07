import { Router } from 'express';
import { upload } from '../utils/storage.util';
import { uploadImage } from '../controllers/storage.controller';

const router = Router();

router.post('/upload', upload.single('image'), (req, res, next) => {
    uploadImage(req, res, next).catch(next);
});

export default router;