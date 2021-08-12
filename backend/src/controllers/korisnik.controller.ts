import express from "express";
import Korisnik from "../models/korisnik";

export class KorisnikController {
  // proveriti da li ima korisnik sa mejlom
  dodajKorisnika = (req: express.Request, res: express.Response) => {
    Korisnik.findOne({ korime: req.body.korime }, (err, korisnik) => {
      if (err) {
        console.log(err);
      } else if (korisnik) {
        res.json({
          poruka: "Korisnicko ime zauzeto",
          korisnik: null,
        });
      } else {
        const url = req.protocol + "://" + req.get("host");
        let profilnaPath = "";
        console.log(req.file);
        if (req.file) {
          profilnaPath = url + "/images/" + req.file.filename;
        } else {
          profilnaPath = url + "/images/default.png";
        }
        const korisnik = new Korisnik({
          ime: req.body.ime,
          prezime: req.body.prezime,
          korime: req.body.korime,
          lozinka: req.body.lozinka,
          grad: req.body.grad,
          drzava: req.body.drzava,
          email: req.body.email,
          status: "gost",
          tip: req.body.tip,
          profilnaPath: profilnaPath,
        });
        console.log(korisnik);
        korisnik.save().then((noviKorisnik) => {
          res.status(200).json({
            poruka: "Korisnik uspesno registrovan",
            korisnik: noviKorisnik,
          });
        });
      }
    });
  };

  izmeniKorisnika = (req: express.Request, res: express.Response) => {
    console.log("Izmeni korisnika", req.body);
    if (!req.body._id) {
      res.send("Id undefined");
    }
    Korisnik.findById(req.body._id, (err, korisnik) => {
      if (err) {
        console.log(err);
      } else if (!korisnik) {
        console.log("greska korisnik sa id: " + req.body._id + " ne postoji");
      } else {
        Korisnik.find({ korime: req.body.korime }, (err, korisnici) => {
          if (err) {
            console.log(err);
          } else if (korisnici.length > 1) {
            res.json({
              poruka: "Korisnicko ime zauzeto",
              korisnik: null,
            });
          } else {
            Korisnik.findOneAndUpdate(
              { _id: req.body._id },
              {
                $set: {
                  ime: req.body.ime,
                  prezime: req.body.prezime,
                  korime: req.body.korime,
                  grad: req.body.grad,
                  drzava: req.body.drzava,
                  email: req.body.email,
                },
              },
              (err, noviKorisnik) => {
                if (err) {
                  console.log(err);
                } else {
                  res.status(200).json({
                    poruka: "Korisnik uspesno azuriran",
                    korisnik: noviKorisnik,
                  });
                }
              }
            );
          }
        });
      }
    });
  };

  promeniSifru = (req: express.Request, res: express.Response) => {
    Korisnik.findOne({korime: req.body.korime}, (err, korisnik)=> {
      if (err) {
        console.log(err);
      } else {
        Korisnik.updateOne({korime: req.body.korime}, 
          { $set: 
            {lozinka: req.body.lozinka}
        }, (err, k)=> {
          if (err) {
            console.log(err);
          } else {
            res.json({
              poruka: "Korisnik uspesno azuriran"
            })
          }
        })
      }
    })
  }

  promeniSliku = (req: express.Request, res: express.Response) => {
    const url = req.protocol + "://" + req.get("host");
    let profilnaPath = "";
    console.log(req.file);
    if (req.file) {
      profilnaPath = url + "/images/" + req.file.filename;
    } else {
      profilnaPath = url + "/images/default.png";
    }
    console.log(profilnaPath);
    Korisnik.findOne({korime: req.body.korime}, (err, korisnik)=> {
      if (err) {
        console.log(err);
      } else {
        Korisnik.updateOne({korime: req.body.korime}, 
          { $set: 
            {profilnaPath: profilnaPath}
        }, (err, k)=> {
          if (err) {
            console.log(err);
          } else {
            res.json({
              poruka: "Korisnik uspesno azuriran",
              profilnaPath: profilnaPath
            })
          }
        })
      }
    })

  }

  obrisiKorisnika = (req: express.Request, res: express.Response) => {
    Korisnik.deleteOne({ korime: req.body.korime }, function (err) {
      if (err) console.log(err);
    });
    res.json({ poruka: "korisnik obrisan" });
  };

  dohvatiKorisnika = (req: express.Request, res: express.Response) => {
    Korisnik.findOne(
      { korime: req.body.korime, lozinka: req.body.lozinka },
      (err, korisnik) => {
        if (err) {
          console.log(err);
        } else {
          res.json(korisnik);
        }
      }
    );
  };

  dohvatiKorisnikaKorime = (req: express.Request, res: express.Response) => {
    Korisnik.findOne({ korime: req.body.korime }, (err, korisnik) => {
      if (err) {
        console.log(err);
      } else {
        res.json(korisnik);
      }
    });
  };

  odobriKorisnika = (req: express.Request, res: express.Response) => {
    Korisnik.updateOne(
      { korime: req.body.korime },
      { status: req.body.tip },
      (err, korisnik) => {
        if (err) {
          console.log(err);
        } else {
          res.json({ poruka: "korisnik azuriran" });
        }
      }
    );
  };

  dohvatiSve = (req: express.Request, res: express.Response) => {
    Korisnik.find({}, (err, docs) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(docs);
      }
    });
  };

  blokirajKorisnika = (req: express.Request, res: express.Response) => {
    Korisnik.updateOne(
      { korime: req.body.korime1 },
      { $push: { blokirani: req.body.korime2 } },
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("korisnik blokiran");
        }
      }
    );
  };

  odblokirajKorisnika = (req: express.Request, res: express.Response) => {
    Korisnik.updateOne(
      { korime: req.body.korime1 },
      { $pull: { blokirani: req.body.korime2 } },
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
          res.send("korisnik odblokiran");
        }
      }
    );
  };
}
