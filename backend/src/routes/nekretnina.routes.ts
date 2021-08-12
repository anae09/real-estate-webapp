import express from 'express'
import { upload_file } from '../storage';
import { NekretninaController } from '../controllers/nekretnina.controller';

const nekretninaRouter = express.Router();

nekretninaRouter.route("/").get((req, res)=> {
    res.send("Nekretnine ruter radi!");
})

nekretninaRouter.route("/izmeniVlasnika").post((req, res)=> {
    new NekretninaController().izmeniVlasnika(req, res);
})

nekretninaRouter.route("/izmeniKupca").post((req, res)=> {
    new NekretninaController().izmeniKupca(req, res);
})

nekretninaRouter.route("/dodajNekretninu").post(upload_file.array('media'),(req, res)=> {
    new NekretninaController().dodajNekretninu(req, res);
});

nekretninaRouter.route("/dodajFajlove").post(upload_file.array('media'),(req, res)=> {
    new NekretninaController().dodajFajlove(req, res);
});

nekretninaRouter.route("/dohvatiSve").get((req, res)=> {
    new NekretninaController().dohvatiSveNekretnine(req, res);
});

nekretninaRouter.route("/dohvatiPromovisane").get((req, res)=> {
    new NekretninaController().dohvatiPromovisane(req, res);
});

nekretninaRouter.route("/odobriNekretninu").post((req, res)=> {
    new NekretninaController().odobriNekretninu(req, res);
});

nekretninaRouter.route("/promocijaNekretnine").post((req, res)=> {
    new NekretninaController().promocijaNekretnine(req, res);
});

nekretninaRouter.route("/ukloniNekretninu").post((req, res)=> {
    new NekretninaController().ukloniNekretninu(req, res);
});

nekretninaRouter.route("/pretragaNekretnina").post((req, res)=> {
    new NekretninaController().pretragaNekretnina(req, res);
});

nekretninaRouter.route("/dohvatiNekretninu").post((req, res)=> {
    new NekretninaController().dohvatiNekretninu(req, res);
});

nekretninaRouter.route("/dohvatiNekretnineVlasnika").post((req, res)=> {
    new NekretninaController().dohvatiNekretnineVlasnika(req, res);
});

nekretninaRouter.route("/iznajmiNekretninu").post((req, res)=> {
    new NekretninaController().iznajmiNekretninu(req, res);
});

nekretninaRouter.route("/ukloniSliku").post((req, res)=> {
    new NekretninaController().ukloniSliku(req, res);
});

nekretninaRouter.route("/ukloniVideo").post((req, res)=> {
    new NekretninaController().ukloniVideo(req, res);
});

nekretninaRouter.route("/ukloniPeriod").post((req, res)=> {
    new NekretninaController().ukloniPeriod(req, res);
});

nekretninaRouter.route("/azurirajNekretninu").post((req, res)=> {
    new NekretninaController().azurirajNekretninu(req, res);
});

nekretninaRouter.route("/napraviPonudu").post((req, res) => {
    new NekretninaController().napraviPonudu(req, res);
});

nekretninaRouter.route("/ukloniPonudu").post((req, res) => {
    new NekretninaController().ukloniPonudu(req, res);
});

nekretninaRouter.route("/prihvatiPonudu").post((req, res) => {
    new NekretninaController().prihvatiPonudu(req, res);
});

nekretninaRouter.route("/potvrdiKupovinu").post((req, res) => {
    new NekretninaController().potvrdiKupovinu(req, res);
});

nekretninaRouter.route("/potvrdiIzdavanje").post((req, res) => {
    new NekretninaController().potvrdiIzdavanje(req, res);
});

nekretninaRouter.route("/odbijPonudu").post((req, res) => {
    new NekretninaController().odbijPonudu(req, res);
});

nekretninaRouter.route("/brojNekretninaPoGradu").get((req, res) => {
    new NekretninaController().brojNekretninaPoGradu(req, res);
});

nekretninaRouter.route("/stanoviPodaci").get((req, res) => {
    new NekretninaController().stanoviPodaci(req, res);
});

nekretninaRouter.route("/kucePodaci").get((req, res) => {
    new NekretninaController().kucePodaci(req, res);
});

nekretninaRouter.route("/cenovniRang").post((req, res) => {
    new NekretninaController().cenovniRang(req, res);
});



export default nekretninaRouter;