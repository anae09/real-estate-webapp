import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Korisnik = new Schema({
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    korime: {
        type: String
    },
    lozinka: {
        type: String
    },
    email: {
        type: String
    },
    grad: {
        type: String
    },
    drzava: {
        type: String
    },
    profilnaPath: {
        type: String
    },
    status: {
        type: String
    },
    tip: {
        type: String
    },
    blokirani: {
        type: Array
    }
});

export default mongoose.model('Korisnik', Korisnik, 'korisnici');