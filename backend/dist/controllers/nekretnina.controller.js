"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NekretninaController = void 0;
const nekretnina_1 = __importDefault(require("../models/nekretnina"));
class NekretninaController {
    constructor() {
        this.izmeniVlasnika = (req, res) => {
            console.log("------izmeni vlasnika--------");
            nekretnina_1.default.updateMany({ vlasnik: req.body.staroKorime }, { $set: { vlasnik: req.body.novoKorime } }, (err, docs) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(docs);
                    res.json({
                        poruka: "Uspesno"
                    });
                }
            });
        };
        this.izmeniKupca = (req, res) => {
            console.log("------izmeni kupca--------");
            nekretnina_1.default.updateMany({ "ponude.kupac": req.body.staroKorime }, { $set: { "ponude.$.kupac": req.body.novoKorime } }, (err, docs) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(docs);
                    res.json({
                        poruka: "Uspesno"
                    });
                }
            });
        };
        this.dodajNekretninu = (req, res) => {
            const url = req.protocol + "://" + req.get("host");
            let images = [];
            let video = [];
            console.log("upload files-files:", req.files);
            if (!req.files) {
                images.push(url + "/images/nekretnina_default.jpg");
            }
            else {
                let files = req.files;
                files.forEach((file) => {
                    let path = url + "/images/" + file.filename;
                    if (file.filename.endsWith("mp4")) {
                        video.push(path);
                    }
                    else {
                        images.push(path);
                    }
                });
            }
            let novaNekretnina = new nekretnina_1.default({
                naziv: req.body.naziv,
                adresa: req.body.adresa,
                grad: req.body.grad,
                opstina: req.body.opstina,
                kategorija: req.body.kategorija,
                brojSpratova: req.body.brojSpratova,
                brojSprata: req.body.brojSprata,
                kvadratura: req.body.kvadratura,
                brojSoba: req.body.brojSoba,
                imaNamestaj: req.body.imaNamestaj,
                transakcija: req.body.transakcija,
                slike: images,
                video: video,
                iznajmljivanje: new Array(),
                cena: req.body.cena,
                vlasnik: req.body.vlasnik,
                aktivna: false,
                status: "neodobrena",
                promovisana: false,
                ponude: new Array(),
            });
            console.log("dodaj nekretninu:", novaNekretnina);
            novaNekretnina.save().then((n) => {
                res.status(200).json({
                    poruka: "Nekretnina uspesno dodata",
                    images: images,
                    video: video,
                });
            });
        }; // kraj dodajNekretninu
        this.azurirajNekretninu = (req, res) => {
            nekretnina_1.default.findOne({ _id: req.body._id }, (err, nekretnina) => {
                if (err) {
                    console.log(err);
                }
                else if (!nekretnina) {
                    res.json({ poruka: "Ne postoji nekretnina sa id: " + req.body._id });
                }
                else {
                    let filter = {
                        naziv: req.body.naziv,
                        adresa: req.body.adresa,
                        grad: req.body.grad,
                        opstina: req.body.opstina,
                        kategorija: req.body.kategorija,
                        brojSpratova: req.body.brojSpratova,
                        brojSprata: req.body.brojSprata,
                        kvadratura: req.body.kvadratura,
                        brojSoba: req.body.brojSoba,
                        imaNamestaj: req.body.imaNamestaj,
                        transakcija: req.body.transakcija,
                        cena: req.body.cena,
                        vlasnik: req.body.vlasnik,
                    };
                    nekretnina_1.default.findOneAndUpdate({ _id: req.body._id }, filter, (err, n) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            res.json({ poruka: "Nekretnina uspesno azurirana" });
                        }
                    });
                }
            });
        };
        this.dohvatiSveNekretnine = (req, res) => {
            nekretnina_1.default.find({}, (err, nekretnine) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(nekretnine);
                }
            });
        }; // kraj dohvatiSveNekretnine
        this.dohvatiPromovisane = (req, res) => {
            nekretnina_1.default.find({ promovisana: true, aktivna: true }, (err, nekretnine) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(nekretnine);
                }
            });
        };
        this.dohvatiNekretninu = (req, res) => {
            nekretnina_1.default.findOne({ _id: req.body._id }, (err, nekretnina) => {
                if (err) {
                    console.log(err);
                }
                else if (!nekretnina) {
                    res.json({
                        poruka: "Ne postoji nekretnina sa id: " + req.body._id,
                        nekretnina: null,
                    });
                }
                else {
                    res.json({
                        poruka: "Uspesno",
                        nekretnina: nekretnina,
                    });
                }
            });
        };
        this.dohvatiNekretnineVlasnika = (req, res) => {
            nekretnina_1.default.find({ vlasnik: req.body.vlasnik }, (err, nekretnine) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json({
                        poruka: "Uspesno",
                        nekretnine: nekretnine,
                    });
                }
            });
        };
        this.odobriNekretninu = (req, res) => {
            nekretnina_1.default.findOne({ _id: req.body._id }, (err, nekretnina) => {
                if (err) {
                    console.log(err);
                }
                else if (!nekretnina) {
                    res.json({
                        poruka: "Ne postoji nekretnina sa id: " + req.body._id,
                    });
                }
                else {
                    nekretnina_1.default.updateOne({ _id: req.body._id }, { $set: { status: "odobrena", aktivna: true } }, (err, odg) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            res.json({
                                poruka: "Nekretnina " + req.body._id + " odobrena",
                            });
                        }
                    });
                }
            });
        }; // kraj odobriNekretninu
        this.ukloniNekretninu = (req, res) => {
            nekretnina_1.default.deleteOne({ _id: req.body._id }, function (err) {
                if (err)
                    console.log(err);
            });
            res.json({ poruka: "Nekretnina obrisana" });
        }; // kraj ukloniNekretninu
        this.promocijaNekretnine = (req, res) => {
            nekretnina_1.default.findOne({ _id: req.body._id }, (err, nekretnina) => {
                if (err) {
                    console.log(err);
                }
                else if (!nekretnina) {
                    res.json({
                        poruka: "Ne postoji nekretnina sa id: " + req.body._id,
                    });
                }
                else {
                    nekretnina_1.default.updateOne({ _id: req.body._id }, { $set: { promovisana: req.body.promocija } }, (err, odg) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            res.json({
                                poruka: "Nekretnina " +
                                    req.body._id +
                                    " promocija-> " +
                                    req.body.promocija,
                            });
                        }
                    });
                }
            });
        }; // kraj promovisiNekretninu
        this.pretragaNekretnina = (req, res) => {
            let grad = req.body.grad;
            let cenaOd = req.body.cenaOd;
            let cenaDo = req.body.cenaDo;
            let filter = { aktivna: true };
            if (grad) {
                filter.grad = grad;
            }
            if (cenaOd && cenaDo) {
                filter.cena = { $gte: cenaOd, $lte: cenaDo };
            }
            else if (cenaOd) {
                filter.cena = { $gte: cenaOd };
            }
            else if (cenaDo) {
                filter.cena = { $lte: cenaDo };
            }
            console.log("filter", filter);
            nekretnina_1.default.find(filter, (err, nekretnine) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(nekretnine);
                }
            });
        };
        this.iznajmiNekretninu = (req, res) => {
            nekretnina_1.default.findOne({ _id: req.body._id }, (err, nekretnina) => {
                if (err) {
                    console.log(err);
                }
                else if (!nekretnina) {
                    res.json({
                        poruka: "Ne postoji nekretnina sa id: " + req.body._id,
                    });
                }
                else {
                    let datumOd = new Date(req.body.datumOd);
                    let datumDo = new Date(req.body.datumDo);
                    console.log(nekretnina);
                    let zauzeta = false;
                    for (var i = 0; i < nekretnina.iznajmljivanje.length; i++) {
                        if ((datumOd >= nekretnina.iznajmljivanje[i].datumOd &&
                            datumOd <= nekretnina.iznajmljivanje[i].datumDo) ||
                            (datumDo >= nekretnina.iznajmljivanje[i].datumOd &&
                                datumDo <= nekretnina.iznajmljivanje[i].datumDo)) {
                            zauzeta = true;
                            break;
                        }
                    }
                    if (zauzeta) {
                        res.json({
                            poruka: "Zauzeta u trazenom periodu",
                        });
                    }
                    else {
                        let noviPeriod = { datumOd: datumOd, datumDo: datumDo };
                        nekretnina_1.default.findOneAndUpdate({ _id: req.body._id }, { $push: { iznajmljivanje: noviPeriod } }, (err, n) => {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                res.json({
                                    poruka: "Uspesno",
                                });
                            }
                        });
                    }
                }
            });
        }; // kraj iznajmiNekretninu
        this.ukloniSliku = (req, res) => {
            nekretnina_1.default.findOneAndUpdate({ _id: req.body._id }, { $pull: { slike: req.body.imagePath } }, (err, n) => {
                if (err) {
                    console.log(err);
                }
                else {
                    nekretnina_1.default.findOne({ _id: req.body._id }, (err, nekretnina) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            const url = req.protocol + "://" + req.get("host");
                            console.log(nekretnina.slike.length);
                            if (nekretnina.slike.length == 0) {
                                // ako su obrisane sve slike dodajemo default
                                let imagePath = url + "/images/nekretnina_default.jpg";
                                nekretnina_1.default.findOneAndUpdate({ _id: req.body._id }, { $push: { slike: imagePath } });
                            }
                            res.json({
                                poruka: "Uspesno",
                            });
                        }
                    });
                }
            });
        }; // kraj ukloniSliku
        this.ukloniVideo = (req, res) => {
            nekretnina_1.default.findOneAndUpdate({ _id: req.body._id }, { $pull: { video: req.body.videoPath } }, (err, n) => {
                if (err) {
                    console.log(err);
                }
                else {
                    nekretnina_1.default.findOne({ _id: req.body._id }, (err, nekretnina) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            res.json({
                                poruka: "Uspesno",
                            });
                        }
                    });
                }
            });
        }; // kraj ukloniSliku
        this.dodajFajlove = (req, res) => {
            const url = req.protocol + "://" + req.get("host");
            let images = [];
            let video = [];
            console.log("upload files-files:", req.files);
            if (req.files) {
                let files = req.files;
                files.forEach((file) => {
                    let path = url + "/images/" + file.filename;
                    if (file.filename.endsWith("mp4")) {
                        video.push(path);
                    }
                    else {
                        images.push(path);
                    }
                });
                console.log("images", images);
                console.log("video", video);
                if (images.length > 0) {
                    nekretnina_1.default.findOneAndUpdate({ _id: req.body._id }, { $push: { slike: { $each: images } } }, (err, n) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log("update images", n);
                        }
                    });
                }
                if (video.length > 0) {
                    nekretnina_1.default.findOneAndUpdate({ _id: req.body._id }, { $push: { video: { $each: video } } }, (err, n) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log("update video", n);
                        }
                    });
                }
                res.json({ poruka: "Uspesno", images: images, video: video });
            }
        }; // kraj dodajFajlove
        this.ukloniPeriod = (req, res) => {
            nekretnina_1.default.findOne({ _id: req.body._id }, (err, nekretnina) => {
                if (err) {
                    console.log(err);
                }
                else if (!nekretnina) {
                    res.json({
                        poruka: "Ne postoji nekretnina sa id: " + req.body._id,
                    });
                }
                else {
                    let datumOd = new Date(req.body.datumOd);
                    let datumDo = new Date(req.body.datumDo);
                    console.log("datum od", datumOd);
                    console.log("datum do", datumDo);
                    let iznajmljivanje = nekretnina.iznajmljivanje.filter((p) => p.datumOd === datumOd && p.datumDo === datumDo);
                    console.log(iznajmljivanje);
                    nekretnina_1.default.findOneAndUpdate({ _id: req.body._id }, { iznajmljivanje: iznajmljivanje }, (err, n) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            res.json({ poruka: "uspesno" });
                        }
                    });
                }
            });
        }; // kraj ukloniPeriod
        this.napraviPonudu = (req, res) => {
            let datumOd = (req.body.datumOd) ? new Date(req.body.datumOd) : null;
            let datumDo = (req.body.datumDo) ? new Date(req.body.datumDo) : null;
            nekretnina_1.default.findOne({ _id: req.body._id }, (err, nekretnina) => {
                if (err) {
                    console.log(err);
                }
                else {
                    // let novi_id = (nekretnina.ponude.length + 1).toString();
                    let novi_id = "" + Date.now();
                    console.log("Napravi ponudu, id:", novi_id);
                    const ponuda = {
                        id: novi_id,
                        placanje: req.body.placanje,
                        kupac: req.body.kupac,
                        datumOd: datumOd,
                        datumDo: datumDo,
                        status: "cekanje"
                    };
                    console.log("ponuda", ponuda);
                    nekretnina_1.default.findOneAndUpdate({ _id: req.body._id }, { $push: { ponude: ponuda } }, (err, n) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log(n);
                            res.json({
                                poruka: "uspesno",
                            });
                        }
                    });
                }
            });
        };
        this.ukloniPonudu = (req, res) => {
            nekretnina_1.default.findOneAndUpdate({ _id: req.body._id }, { $pull: { ponude: { id: req.body.id } } }, (err, n) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(n);
                    res.json({
                        poruka: "uspesno",
                    });
                }
            });
        };
        // vlasnik = korisnik
        this.prihvatiPonudu = (req, res) => {
            console.log("---prihvati ponudu-----");
            console.log("ponuda: " + req.body.id + ", kupac: " + req.body.kupac);
            nekretnina_1.default.findOneAndUpdate({ _id: req.body._id, "ponude.id": req.body.id, "ponude.kupac": req.body.kupac }, { $set: { "ponude.$.status": "prihvacena" } }, (err, n) => {
                if (err) {
                    console.log(err);
                }
                else {
                    //console.log(n);
                    res.json({ poruka: "uspesno" });
                }
            });
        };
        this.potvrdiKupovinu = (req, res) => {
            console.log("----potvrdi kupovinu----");
            nekretnina_1.default.findOneAndUpdate({ _id: req.body._id, "ponude.id": req.body.id }, { aktivna: false,
                $set: { "ponude.$.status": "odobrena" }
            }, (err, n) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(n);
                    res.json({ poruka: "uspesno" });
                }
            });
        };
        this.potvrdiIzdavanje = (req, res) => {
            console.log("----potvrdi izdavanje----");
            let p = {
                datumOd: new Date(req.body.datumOd),
                datumDo: new Date(req.body.datumDo)
            };
            nekretnina_1.default.findOneAndUpdate({ _id: req.body._id, "ponude.id": req.body.id }, {
                $set: { "ponude.$.status": "odobrena" },
                $push: { iznajmljivanje: p }
            }, (err, n) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(n);
                    res.json({ poruka: "uspesno" });
                }
            });
        };
        this.odbijPonudu = (req, res) => {
            console.log("----odbij ponudu----");
            nekretnina_1.default.findOneAndUpdate({ _id: req.body._id, "ponude.id": req.body.id }, {
                $set: { "ponude.$.status": "neodobrena" }
            }, (err, n) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(n);
                    res.json({ poruka: "uspesno" });
                }
            });
        };
        this.brojNekretninaPoGradu = (req, res) => {
            nekretnina_1.default.aggregate([
                {
                    $match: { status: "odobrena", aktivna: true }
                },
                { $group: { _id: "$grad", ukupno: { $sum: 1 } }
                }
            ]).exec((err, rez) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(rez);
                    res.json(rez);
                }
            });
        };
        this.stanoviPodaci = (req, res) => {
            let transakcija = req.body.transakcija;
            nekretnina_1.default.aggregate([
                {
                    $match: { "kategorija": "Stan", status: "odobrena", aktivna: true }
                },
                { $group: { _id: "$transakcija", ukupno: { $sum: 1 } }
                }
            ]).exec((err, rez) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(rez);
                    res.json(rez);
                }
            });
        };
        this.kucePodaci = (req, res) => {
            let transakcija = req.body.transakcija;
            nekretnina_1.default.aggregate([
                {
                    $match: { "kategorija": "Kuca", status: "odobrena", aktivna: true }
                },
                { $group: { _id: "$transakcija", ukupno: { $sum: 1 } }
                }
            ]).exec((err, rez) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(rez);
                    res.json(rez);
                }
            });
        };
        this.cenovniRang = (req, res) => {
            let cenaOd = req.body.cenaOd;
            let cenaDo = req.body.cenaDo;
            let filter = { aktivna: true, status: "odobrena" };
            if (cenaOd && cenaDo) {
                filter.cena = { $gte: cenaOd, $lte: cenaDo };
            }
            else if (cenaOd) {
                filter.cena = { $gte: cenaOd };
            }
            else if (cenaDo) {
                filter.cena = { $lte: cenaDo };
            }
            console.log("filter", filter);
            nekretnina_1.default.aggregate([
                { $match: filter },
            ]).count("ukupno").then(rez => {
                console.log(rez);
                res.json(rez);
            });
        };
    }
}
exports.NekretninaController = NekretninaController;
//# sourceMappingURL=nekretnina.controller.js.map