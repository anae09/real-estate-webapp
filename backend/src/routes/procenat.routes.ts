import express from 'express'
import { ProcenatController } from '../controllers/procenat.controller';

const procenatRouter = express.Router();

procenatRouter.route("/").get((req, res)=> {
    res.send("Procenat ruter radi!")
});

procenatRouter.route("/dohvatiProcenat").get((req, res)=> {
    new ProcenatController().dohvatiProcenat(req, res);
});

procenatRouter.route("/postaviProcenat").post((req, res)=> {
    new ProcenatController().postaviProcenat(req, res);
});

export default procenatRouter;