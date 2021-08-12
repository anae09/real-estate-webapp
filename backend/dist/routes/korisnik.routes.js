"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const korisnik_controller_1 = require("../controllers/korisnik.controller");
const storage_1 = require("../storage");
const korisnikRouter = express_1.default.Router();
korisnikRouter.route("/").get((req, res) => {
    res.send("korisnici router working");
});
korisnikRouter
    .route("/dodajKorisnika")
    .post(storage_1.upload.single("image"), (req, res) => {
    new korisnik_controller_1.KorisnikController().dodajKorisnika(req, res);
});
korisnikRouter
    .route("/izmeniKorisnika")
    .post((req, res) => {
    new korisnik_controller_1.KorisnikController().izmeniKorisnika(req, res);
});
korisnikRouter
    .route("/promeniSifru")
    .post((req, res) => {
    new korisnik_controller_1.KorisnikController().promeniSifru(req, res);
});
korisnikRouter
    .route("/promeniSliku")
    .post(storage_1.upload.single("image"), (req, res) => {
    new korisnik_controller_1.KorisnikController().promeniSliku(req, res);
});
korisnikRouter
    .route("/obrisiKorisnika")
    .post((req, res) => new korisnik_controller_1.KorisnikController().obrisiKorisnika(req, res));
korisnikRouter
    .route("/dohvatiKorisnika")
    .post((req, res) => new korisnik_controller_1.KorisnikController().dohvatiKorisnika(req, res));
korisnikRouter
    .route("/dohvatiKorisnikaKorime")
    .post((req, res) => new korisnik_controller_1.KorisnikController().dohvatiKorisnikaKorime(req, res));
korisnikRouter
    .route("/odobriKorisnika")
    .post((req, res) => new korisnik_controller_1.KorisnikController().odobriKorisnika(req, res));
korisnikRouter
    .route("/blokirajKorisnika")
    .post((req, res) => new korisnik_controller_1.KorisnikController().blokirajKorisnika(req, res));
korisnikRouter
    .route("/odblokirajKorisnika")
    .post((req, res) => new korisnik_controller_1.KorisnikController().odblokirajKorisnika(req, res));
korisnikRouter
    .route("/dohvatiSve")
    .get((req, res) => new korisnik_controller_1.KorisnikController().dohvatiSve(req, res));
// korisnikRouter.route("/uploadFile").post(upload.single("image"), (req, res) => {
//   const url = req.protocol + "://" + req.get("host");
//   console.log(req.file);
//   if (req.file) {
//     res.send({
//         imagePath: url + "/images/" + req.file.filename,
//       });
//   } else {
//     res.send({
//         imagePath: url + "/images/default.png"
//       });
//   }
// });
exports.default = korisnikRouter;
//# sourceMappingURL=korisnik.routes.js.map