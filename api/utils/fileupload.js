const multer = require('multer');

const storageStrategy = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, `image_${new Date().getTime()}_${file.originalname}`);
    },
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    } else { // accept file
        cb(new Error('Only JPEG/PNG Accepted'), false);
    }
}

// create a multer function to upload the file based on the constraints set
const upload = multer({
    storage: storageStrategy,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter,
});

module.exports = {
    upload,
}
