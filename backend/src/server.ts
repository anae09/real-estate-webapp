import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import moongose from "mongoose";
import path from "path";
const multer = require("multer");

import korisnikRouter from "./routes/korisnik.routes";
import { upload, upload_file } from "./storage";
import nekretninaRouter from "./routes/nekretnina.routes";
import procenatRouter from "./routes/procenat.routes";

moongose.set('useNewUrlParser', true);
moongose.set('useFindAndModify', false);

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "../images")));


try {
  moongose.connect("mongodb://localhost:27017/projekat");
} catch (error) {
  console.log("mongo not connected!!!!");
}

const connection = moongose.connection;

connection.once("open", () => {
  console.log(`mongo ok`);
});

const router = express.Router();
router.get("/", (req, res) => {
  res.send("Server working");
});

router.route("/uploadFile").post(upload.single("image"), (req, res) => {
    const url = req.protocol + '://' + req.get("host");
    res.send({
      imagePath: url + "/images/" + req.file.filename
  });
});

router.route("/uploadVideo").post(upload_file.single("video"), (req, res) => {
  const url = req.protocol + '://' + req.get("host");
  console.log(req.file);
  res.send({
    imagePath: url + "/images/" + req.file.filename
});
});

router.route("/uploadMedia").post(upload_file.array('media'), (req, res) => {
  const url = req.protocol + '://' + req.get("host");
  let images:String[] = [];
  let video:String[] = [];
  console.log("upload files-files:", req.files);
  //console.log(req.files.length);
  let files = req.files as Express.Multer.File[];
  files.forEach(file=> {
    let path = url + "/images/" + file.filename;
    if (file.filename.endsWith("mp4")) {
      video.push(path);
    } else {
      images.push(path);
    }
  })
  res.json({
    "images": images,
    "video": video
  });
})


router.use("/korisnici", korisnikRouter);
router.use("/nekretnine", nekretninaRouter);
router.use("/procenat", procenatRouter);

app.use("/", router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
