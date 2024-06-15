import multerS3 from 'multer-s3';
import {s3} from '../middlewares/s3-middleware';

import multer from 'multer';



const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET_NAME!,
    acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, `songs/${Date.now().toString()}_${file.originalname}`);
    },
  }),
});

export default upload;
