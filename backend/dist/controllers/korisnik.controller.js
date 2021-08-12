"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KorisnikController = void 0;
const korisnik_1 = __importDefault(require("../models/korisnik"));
class KorisnikController {
    constructor() {
        // proveriti da li ima korisnik sa mejlom
        this.dodajKorisnika = (req, res) => {
            korisnik_1.default.findOne({ korime: req.body.korime }, (err, korisnik) => {
                if (err) {
                    console.log(err);
                }
                else if (korisnik) {
                    res.json({
                        poruka: "Korisnicko ime zauzeto",
                        korisnik: null,
                    });
                }
                else {
                    const url = req.protocol + "://" + req.get("host");
                    let profilnaPath = "";
                    console.log(req.file);
                    if (req.file) {
                        profilnaPath = url + "/images/" + req.file.filename;
                    }
                    else {
                        profilnaPath = url + "/images/default.png";
                    }
                    const korisnik = new korisnik_1.default({
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
        this.izmeniKorisnika = (req, res) => {
            console.log("Izmeni korisnika", req.body);
            if (!req.body._id) {
                res.send("Id undefined");
            }
            korisnik_1.default.findById(req.body._id, (err, korisnik) => {
                if (err) {
                    console.log(err);
                }
                else if (!korisnik) {
                    console.log("greska korisnik sa id: " + req.body._id + " ne postoji");
                }
                else {
                    korisnik_1.default.find({ korime: req.body.korime }, (err, korisnici) => {
                        if (err) {
                            console.log(err);
                        }
                        else if (korisnici.length > 1) {
                            res.json({
                                poruka: "Korisnicko ime zauzeto",
                                korisnik: null,
                            });
                        }
                        else {
                            korisnik_1.default.findOneAndUpdate({ _id: req.body._id }, {
                                $set: {
                                    ime: req.body.ime,
                                    prezime: req.body.prezime,
                                    korime: req.body.korime,
                                    grad: req.body.grad,
                                    drzava: req.body.drzava,
                                    email: req.body.email,
                                },
                            }, (err, noviKorisnik) => {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    res.status(200).json({
                                        poruka: "Korisnik uspesno azuriran",
                                        korisnik: noviKorisnik,
                                    });
                                }
                            });
                        }
                    });
                }
            });
        };
        this.promeniSifru = (req, res) => {
            korisnik_1.default.findOne({ korime: req.body.korime }, (err, korisnik) => {
                if (err) {
                    console.log(err);
                }
                else {
                    korisnik_1.default.updateOne({ korime: req.body.korime }, { $set: { lozinka: req.body.lozinka }
                    }, (err, k) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            res.json({
                                poruka: "Korisnik uspesno azuriran"
                            });
                        }
                    });
                }
            });
        };
        this.promeniSliku = (req, res) => {
            const url = req.protocol + "://" + req.get("host");
            let profilnaPath = "";
            console.log(req.file);
            if (req.file) {
                profilnaPath = url + "/images/" + req.file.filename;
            }
            else {
                profilnaPath = url + "/images/default.png";
            }
            console.log(profilnaPath);
            korisnik_1.default.findOne({ korime: req.body.korime }, (err, korisnik) => {
                if (err) {
                    console.log(err);
                }
                else {
                    korisnik_1.default.updateOne({ korime: req.body.korime }, { $set: { profilnaPath: profilnaPath }
                    }, (err, k) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            res.json({
                                poruka: "Korisnik uspesno azuriran",
                                profilnaPath: profilnaPath
                            });
                        }
                    });
                }
            });
        };
        this.obrisiKorisnika = (req, res) => {
            korisnik_1.default.deleteOne({ korime: req.body.korime }, function (err) {
                if (err)
                    console.log(err);
            });
            res.json({ poruka: "korisnik obrisan" });
        };
        this.dohvatiKorisnika = (req, res) => {
            korisnik_1.default.findOne({ korime: req.body.korime, lozinka: req.body.lozinka }, (err, korisnik) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(korisnik);
                }
            });
        };
        this.dohvatiKorisnikaKorime = (req, res) => {
            korisnik_1.default.findOne({ korime: req.body.korime }, (err, korisnik) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(korisnik);
                }
            });
        };
        this.odobriKorisnika = (req, res) => {
            korisnik_1.default.updateOne({ korime: req.body.korime }, { status: req.body.tip }, (err, korisnik) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json({ poruka: "korisnik azuriran" });
                }
            });
        };
        this.dohvatiSve = (req, res) => {
            korisnik_1.default.find({}, (err, docs) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.status(200).json(docs);
                }
            });
        };
        this.blokirajKorisnika = (req, res) => {
            korisnik_1.default.updateOne({ korime: req.body.korime1 }, { $push: { blokirani: req.body.korime2 } }, (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.send("korisnik blokiran");
                }
            });
        };
        this.odblokirajKorisnika = (req, res) => {
            korisnik_1.default.updateOne({ korime: req.body.korime1 }, { $pull: { blokirani: req.body.korime2 } }, (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(result);
                    res.send("korisnik odblokiran");
                }
            });
        };
    }
}
exports.KorisnikController = KorisnikController;
//# sourceMappingURL=korisnik.controller.js.map