"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const storage_1 = require("../storage");
const nekretnina_controller_1 = require("../controllers/nekretnina.controller");
const nekretninaRouter = express_1.default.Router();
nekretninaRouter.route("/").get((req, res) => {
    res.send("Nekretnine ruter radi!");
});
nekretninaRouter.route("/izmeniVlasnika").post((req, res) => {
    new nekretnina_controller_1.NekretninaController().izmeniVlasnika(req, res);
});
nekretninaRouter.route("/izmeniKupca").post((req, res) => {
    new nekretnina_controller_1.NekretninaController().izmeniKupca(req, res);
});
nekretninaRouter.route("/dodajNekretninu").post(storage_1.upload_file.array('media'), (req, res) => {
    new nekretnina_controller_1.NekretninaController().dodajNekretninu(req, res);
});
nekretninaRouter.route("/dodajFajlove").post(storage_1.upload_file.array('media'), (req, res) => {
    new nekretnina_controller_1.NekretninaController().dodajFajlove(req, res);
});
nekretninaRouter.route("/dohvatiSve").get((req, res) => {
    new nekretnina_controller_1.NekretninaController().dohvatiSveNekretnine(req, res);
});
nekretninaRouter.route("/dohvatiPromovisane").get((req, res) => {
    new nekretnina_controller_1.NekretninaController().dohvatiPromovisane(req, res);
});
nekretninaRouter.route("/odobriNekretninu").post((req, res) => {
    new nekretnina_controller_1.NekretninaController().odobriNekretninu(req, res);
});
nekretninaRouter.route("/promocijaNekretnine").post((req, res) => {
    new nekretnina_controller_1.NekretninaController().promocijaNekretnine(req, res);
});
nekretninaRouter.route("/ukloniNekretninu").post((req, res) => {
    new nekretnina_controller_1.NekretninaController().ukloniNekretninu(req, res);
});
nekretninaRouter.route("/pretragaNekretnina").post((req, res) => {
    new nekretnina_controller_1.NekretninaController().pretragaNekretnina(req, res);
});
nekretninaRouter.route("/dohvatiNekretninu").post((req, res) => {
    new nekretnina_controller_1.NekretninaController().dohvatiNekretninu(req, res);
});
nekretninaRouter.route("/dohvatiNekretnineVlasnika").post((req, res) => {
    new nekretnina_controller_1.NekretninaController().dohvatiNekretnineVlasnika(req, res);
});
nekretninaRouter.route("/iznajmiNekretninu").post((req, res) => {
    new nekretnina_controller_1.NekretninaController().iznajmiNekretninu(req, res);
});
nekretninaRouter.route("/ukloniSliku").post((req, res) => {
    new nekretnina_controller_1.NekretninaController().ukloniSliku(req, res);
});
nekretninaRouter.route("/ukloniVideo").post((req, res) => {
    new nekretnina_controller_1.NekretninaController().ukloniVideo(req, res);
});
nekretninaRouter.route("/ukloniPeriod").post((req, res) => {
    new nekretnina_controller_1.NekretninaController().ukloniPeriod(req, res);
});
nekretninaRouter.route("/azurirajNekretninu").post((req, res) => {
    new nekretnina_controller_1.NekretninaController().azurirajNekretninu(req, res);
});
nekretninaRouter.route("/napraviPonudu").post((req, res) => {
    new nekretnina_controller_1.NekretninaController().napraviPonudu(req, res);
});
nekretninaRouter.route("/ukloniPonudu").post((req, res) => {
    new nekretnina_controller_1.NekretninaController().ukloniPonudu(req, res);
});
nekretninaRouter.route("/prihvatiPonudu").post((req, res) => {
    new nekretnina_controller_1.NekretninaController().prihvatiPonudu(req, res);
});
nekretninaRouter.route("/potvrdiKupovinu").post((req, res) => {
    new nekretnina_controller_1.NekretninaController().potvrdiKupovinu(req, res);
});
nekretninaRouter.route("/potvrdiIzdavanje").post((req, res) => {
    new nekretnina_controller_1.NekretninaController().potvrdiIzdavanje(req, res);
});
nekretninaRouter.route("/odbijPonudu").post((req, res) => {
    new nekretnina_controller_1.NekretninaController().odbijPonudu(req, res);
});
nekretninaRouter.route("/brojNekretninaPoGradu").get((req, res) => {
    new nekretnina_controller_1.NekretninaController().brojNekretninaPoGradu(req, res);
});
nekretninaRouter.route("/stanoviPodaci").get((req, res) => {
    new nekretnina_controller_1.NekretninaController().stanoviPodaci(req, res);
});
nekretninaRouter.route("/kucePodaci").get((req, res) => {
    new nekretnina_controller_1.NekretninaController().kucePodaci(req, res);
});
nekretninaRouter.route("/cenovniRang").post((req, res) => {
    new nekretnina_controller_1.NekretninaController().cenovniRang(req, res);
});
exports.default = nekretninaRouter;
//# sourceMappingURL=nekretnina.routes.js.map