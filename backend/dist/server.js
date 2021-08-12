"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const multer = require("multer");
const korisnik_routes_1 = __importDefault(require("./routes/korisnik.routes"));
const storage_1 = require("./storage");
const nekretnina_routes_1 = __importDefault(require("./routes/nekretnina.routes"));
const procenat_routes_1 = __importDefault(require("./routes/procenat.routes"));
mongoose_1.default.set('useNewUrlParser', true);
mongoose_1.default.set('useFindAndModify', false);
const app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use("/images", express_1.default.static(path_1.default.join(__dirname, "../images")));
try {
    mongoose_1.default.connect("mongodb://localhost:27017/projekat");
}
catch (error) {
    console.log("mongo not connected!!!!");
}
const connection = mongoose_1.default.connection;
connection.once("open", () => {
    console.log(`mongo ok`);
});
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.send("Server working");
});
router.route("/uploadFile").post(storage_1.upload.single("image"), (req, res) => {
    const url = req.protocol + '://' + req.get("host");
    res.send({
        imagePath: url + "/images/" + req.file.filename
    });
});
router.route("/uploadVideo").post(storage_1.upload_file.single("video"), (req, res) => {
    const url = req.protocol + '://' + req.get("host");
    console.log(req.file);
    res.send({
        imagePath: url + "/images/" + req.file.filename
    });
});
router.route("/uploadMedia").post(storage_1.upload_file.array('media'), (req, res) => {
    const url = req.protocol + '://' + req.get("host");
    let images = [];
    let video = [];
    console.log("upload files-files:", req.files);
    //console.log(req.files.length);
    let files = req.files;
    files.forEach(file => {
        let path = url + "/images/" + file.filename;
        if (file.filename.endsWith("mp4")) {
            video.push(path);
        }
        else {
            images.push(path);
        }
    });
    res.json({
        "images": images,
        "video": video
    });
});
router.use("/korisnici", korisnik_routes_1.default);
router.use("/nekretnine", nekretnina_routes_1.default);
router.use("/procenat", procenat_routes_1.default);
app.use("/", router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map