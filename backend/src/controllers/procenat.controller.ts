import express from "express";
import Procenat from "../models/procenat";

export class ProcenatController {
    dohvatiProcenat = (req: express.Request, res: express.Response) => {
        Procenat.find({}, (err, proc)=> {
            if (err) {
                console.log(err);
            } else {
                res.status(200).json(proc);
            }
        })
    }

    postaviProcenat = (req: express.Request, res: express.Response) => {
        let prodaja = req.body.prodaja;
        let izdavanje = req.body.izdavanje;
        console.log(prodaja, izdavanje);
        Procenat.update({}, {$set: {prodaja: prodaja, izdavanje: izdavanje}}, (err, rez)=>{
            if (err) {
                console.log(err);
            } else {
                console.log(rez);
                res.json({poruka: "uspesno"});
            }
        })
    }
};