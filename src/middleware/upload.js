const multer = require("multer");
const path = require("path");

//simpanFile
const multerUpload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./public");
        },
    limits: {
        fileSize: 5000000 // 1000000 Bytes = 1 MB
        },
        
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            const fileName = `${Date.now()}${ext}`;
            cb(null, fileName);
        }
    }),
    
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext === ".png" || ext === ".jpg" || ext === ".jpeg") {
            cb(null, true);
    }
    else {
        const error = {
            message: "file must be .png, .jpg or .jpeg"
        };
        cb(error, false);
        }
    }
});

const upload = (req, res, next) => {
    const multerSingle = multerUpload.single("image");
    multerSingle(req, res, (err) => {
        if (err) {
            console.error("Error when uploading file:", err);
            res.status(500).json({
                error: "Error when uploading file",
            });
        } else {
            next();
        }
    });
};


module.exports = upload;