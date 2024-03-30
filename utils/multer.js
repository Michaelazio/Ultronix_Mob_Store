import multer from "multer";
import fs from "fs";
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));

export const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const path = join(__dirname, "../client/images");
      cb(null, path); 
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });

export const upload = multer({storage: storage});

export const multerMiddleWare = upload.single('image'); 
