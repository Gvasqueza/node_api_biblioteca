const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Ensure the storage directory exists
const storageDir = path.join(__dirname, '../storage');
if (!fs.existsSync(storageDir)) {
    fs.mkdirSync(storageDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, storageDir); // Use the absolute path
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname); // Get the file extension
        cb(null, `${file.fieldname}-${Date.now()}${ext}`); // Ensure Date.now() is called as a function
    }
});

const upload = multer({ storage });

module.exports = upload;
