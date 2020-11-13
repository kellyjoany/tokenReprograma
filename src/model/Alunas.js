const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    nome: { type: String, required: true },
    nasceuEmSp: { type: Boolean, default: false },
    hashPass: String
});

const Alunas = mongoose.model('Alunas', userSchema);

module.exports = Alunas;