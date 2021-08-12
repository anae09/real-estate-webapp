"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcenatController = void 0;
const procenat_1 = __importDefault(require("../models/procenat"));
class ProcenatController {
    constructor() {
        this.dohvatiProcenat = (req, res) => {
            procenat_1.default.find({}, (err, proc) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.status(200).json(proc);
                }
            });
        };
        this.postaviProcenat = (req, res) => {
            let prodaja = req.body.prodaja;
            let izdavanje = req.body.izdavanje;
            console.log(prodaja, izdavanje);
            procenat_1.default.update({}, { $set: { prodaja: prodaja, izdavanje: izdavanje } }, (err, rez) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(rez);
                    res.json({ poruka: "uspesno" });
                }
            });
        };
    }
}
exports.ProcenatController = ProcenatController;
;
//# sourceMappingURL=procenat.controller.js.map