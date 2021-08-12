"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload_file = exports.upload = exports.imageFilter = void 0;
const multer = require("multer");
const path_1 = __importDefault(require("path"));
const MIME_TYPE_MAP = new Map([
    ['image/png', 'png'],
    ['image/jpeg', 'jpeg'],
    ['image/jpg', 'jpg'],
    ['video/mp4', 'mp4']
]);
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path_1.default.join(__dirname, '../images'));
    },
    filename: function (req, file, callback) {
        console.log("storage", file);
        let name = file.originalname.toLowerCase().replace(',', '').split(" ").join("-");
        const ext = MIME_TYPE_MAP.get(file.mimetype);
        console.log(name);
        console.log(ext);
        callback(null, name + "-" + Date.now() + "." + ext);
    },
});
const imageFilter = function (req, file, callback) {
    if (((file.mimetype).includes('jpeg') || (file.mimetype).includes('jpg')
        || (file.mimetype).includes('png')) && file.originalname !== "default.png") {
        callback(null, true);
    }
    else {
        callback(null, false);
    }
};
exports.imageFilter = imageFilter;
exports.upload = multer({ "storage": storage, "fileFilter": exports.imageFilter });
exports.upload_file = multer({ "storage": storage });
//# sourceMappingURL=storage.js.map