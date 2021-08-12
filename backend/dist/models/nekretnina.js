"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Nekretnina = new Schema({
    naziv: {
        type: String
    },
    adresa: {
        type: String
    },
    grad: {
        type: String
    },
    opstina: {
        type: String
    },
    kategorija: {
        type: String
    },
    brojSpratova: {
        type: Number
    },
    brojSprata: {
        type: Number
    },
    kvadratura: {
        type: Number
    },
    brojSoba: {
        type: Number
    },
    imaNamestaj: {
        type: Boolean
    },
    slike: {
        type: Array
    },
    video: {
        type: Array
    },
    iznajmljivanje: {
        type: Array
    },
    transakcija: {
        type: String
    },
    cena: {
        type: Number
    },
    vlasnik: {
        type: String
    },
    aktivna: {
        type: Boolean
    },
    status: {
        type: String
    },
    promovisana: {
        type: Boolean
    },
    ponude: {
        type: Array
    }
});
exports.default = mongoose_1.default.model('Nekretnina', Nekretnina, 'nekretnine');
//# sourceMappingURL=nekretnina.js.map