import express from "express";
import { KorisnikController } from "../controllers/korisnik.controller";

import { upload } from "../storage";

const korisnikRouter = express.Router();

korisnikRouter.route("/").get((req, res) => {
  res.send("korisnici router working");
});

korisnikRouter
  .route("/dodajKorisnika")
  .post(upload.single("image"), (req, res) => {
    new KorisnikController().dodajKorisnika(req, res);
  });

  korisnikRouter
  .route("/izmeniKorisnika")
  .post((req, res) => {
    new KorisnikController().izmeniKorisnika(req, res);
  });

  korisnikRouter
  .route("/promeniSifru")
  .post((req, res) => {
    new KorisnikController().promeniSifru(req, res);
  });

  korisnikRouter
  .route("/promeniSliku")
  .post(upload.single("image"), (req, res) => {
    new KorisnikController().promeniSliku(req, res);
  });

korisnikRouter
  .route("/obrisiKorisnika")
  .post((req, res) => new KorisnikController().obrisiKorisnika(req, res));

korisnikRouter
  .route("/dohvatiKorisnika")
  .post((req, res) => new KorisnikController().dohvatiKorisnika(req, res));

korisnikRouter
  .route("/dohvatiKorisnikaKorime")
  .post((req, res) => new KorisnikController().dohvatiKorisnikaKorime(req, res));

korisnikRouter
  .route("/odobriKorisnika")
  .post((req, res) => new KorisnikController().odobriKorisnika(req, res));

korisnikRouter
  .route("/blokirajKorisnika")
  .post((req, res) => new KorisnikController().blokirajKorisnika(req, res));

korisnikRouter
  .route("/odblokirajKorisnika")
  .post((req, res) => new KorisnikController().odblokirajKorisnika(req, res));

korisnikRouter
  .route("/dohvatiSve")
  .get((req, res) => new KorisnikController().dohvatiSve(req, res));

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

export default korisnikRouter;
