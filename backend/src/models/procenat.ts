import mongoose, { mongo } from 'mongoose'

const Schema = mongoose.Schema;

let Procenat = new Schema({
    izdavanje: {
        type: Number
    },
    prodaja: {
        type: Number
    }
});

export default mongoose.model('Procenat', Procenat, 'procenat');