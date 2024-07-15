export const fileNamer =(req: Express.Request, file: Express.Multer.File, cb:Function )=>{
   
if (!file) return cb(new Error('File is Empty'))


    const fileExptension = file.mimetype.split('/')[1]

    cb(null, file.originalname + '' + Date.now() + '.' + fileExptension )

  
  
}