import mongoose from 'mongoose'

const Schema = mongoose.Schema;

export interface Period {
    datumOd: Date,
    datumDo: Date
}

export interface Ponuda {
    id: string,
    placanje: string,
    datumOd: Date,
    datumDo: Date,
    kupac: string
    status: string
}

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
    kategorija: { // {stan, kuca}
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
    iznajmljivanje: { // periodi iznajmljivanja: sadrzi objekte {datumOd: /, datumDo}
        type: Array
    },
    transakcija: { // {izdavanje, prodaja}
        type: String
    },
    cena: {
        type: Number
    },
    vlasnik: { // username ili agencija
        type: String
    },
    aktivna: { // prodana?
        type: Boolean
    },
    status: { // odobrena, neodobrena
        type: String
    },
    promovisana: {
        type: Boolean
    },
    ponude: {
        type: Array
    }
});

export default mongoose.model('Nekretnina', Nekretnina, 'nekretnine');

export interface INekretnina {
    _id: string;
    naziv: string;
    adresa: string;
    grad: string;
    opstina: string;
    kategorija: string;
    brojSpratova: number;
    brojSprata: number;
    kvadratura: number;
    brojSoba: number;
    imaNamestaj: boolean;
    transakcija: string;
    slike: string[];
    video: string[];
    iznajmljivanje: Period[];
    cena: number;
    vlasnik: string;
    aktivna: boolean;
    status: string;
    promovisana: boolean;
    ponude: Ponuda[];
}