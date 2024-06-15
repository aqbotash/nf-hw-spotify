import { Router } from 'express';
import upload from './multer-config';
import { createSong, getSongs, getSong} from './controller';


const router = Router();

router.post('/', upload.single('song'), createSong);
router.get('/', getSongs);
router.get('/:id', getSong);

export default router;
