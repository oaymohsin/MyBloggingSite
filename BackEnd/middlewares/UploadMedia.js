// Dependencies
const multer = require('multer')
const crypto = require('crypto')
const fs = require('fs')
//Dependencies

//Hashing the ImageUrl
const hashFunc = (filename) => {
    const hash = crypto.createHash('md5');
    hash.update(filename)
    const md5sum = hash.digest('hex')
    return md5sum;
}
// Hashing the ImageUrl

// Middleware for handling the single image with hashfunction
let UploadProductImage = multer({
    storage: multer.diskStorage({
        destination: (req, next, cb) => {
            // let foldername =(req.body.title).slice(0,8); //Getting the first n charcters from req.body.title as foldername

            let path = `./assets/Product/${req.body.title}`;
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path, { recursive: true });
                // fs.mkdirSync(path,function(err,res){
                //     if (err){
                //         res.json(err)
                //     }
                //     else{
                //         res.json('saved Successfully')
                //     }
                // })
            }
            cb(null, path)
        },
        filename: (req, file, cb) => {
            const md5sum = hashFunc(file.originalname);
            let ext = file.mimetype.split('/')[1];
            if (ext.includes('svg')) {
                ext = 'svg'
            }
            cb(null, `${Date.now()}_${md5sum}.${ext}`)
        }
    })
})

//Middleware to handle the image of MerchandiseImages
let uploadMerchandiseImage = multer({
    storage: multer.diskStorage({
        destination: (req, next, cb) => {
            let path = `./assets/Merchandise/${req.body.name}`;
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path, { recursive: true })
            }
            cb(null, path)
        },
        filename: (req, file, cb) => {
            const md5sum = hashFunc(file.originalname);
            let ext = file.mimetype.split('/')[1];
            if (ext.includes('svg')) {
                ext = 'svg'
            }
            cb(null, `${Date.now()}_${md5sum}.${ext}`)
        }
    })
})

module.exports = { UploadProductImage, uploadMerchandiseImage }