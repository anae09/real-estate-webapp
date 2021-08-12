const multer = require("multer");

import path from "path";


const MIME_TYPE_MAP = new Map([
   ['image/png', 'png'],
   ['image/jpeg', 'jpeg'],
   ['image/jpg', 'jpg'],
   ['video/mp4', 'mp4']
]);


const storage = multer.diskStorage({
  destination: function (
    req: Express.Request,
    file: Express.Multer.File,
    callback: (error: Error | null, destination: string) => void
  ) {
    callback(null, path.join(__dirname, '../images'));
  },
  filename: function (
    req: Express.Request,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void
  ) {
    console.log("storage", file);
    let name = file.originalname.toLowerCase().replace(',','').split(" ").join("-");
    const ext = MIME_TYPE_MAP.get(file.mimetype);
    console.log(name);
    console.log(ext);
    callback(null, name + "-" + Date.now() + "." + ext);
  },
});

export const imageFilter = function (
  req: Express.Request,
  file: Express.Multer.File,
  callback: (error: Error | null, result: boolean) => void
) {
    if (((file.mimetype).includes('jpeg') || (file.mimetype).includes('jpg')
      || (file.mimetype).includes('png')) && file.originalname !== "default.png") {
        callback(null, true)
      } else {
        callback(null, false);
      }
  }



export const upload = multer({"storage": storage, "fileFilter": imageFilter});

export const upload_file = multer({"storage": storage});