import { v4 as uuid } from 'uuid';

export const fileNamer =(req: Express.Request, file: Express.Multer.File, cb:Function )=>{
   
if (!file) return cb(new Error('File is Empty'))


    const fileExptension = file.mimetype.split('/')[1]

    return cb(null, `${file.originalname}-${uuid()}.${fileExptension}` )
}