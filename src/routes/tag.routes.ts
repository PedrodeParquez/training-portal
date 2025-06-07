import { Router } from 'express';
import { createTag } from '../controllers/tag.controller';

const router = Router();

router.post('/', createTag);

export default router;