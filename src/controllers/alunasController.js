const mongoose = require('mongoose');
const Alunas = require('../model/Alunas');
const bcrypt = require("bcrypt");
const bcryptSalt = 8;

exports.get = (req, res, next) => {
  Alunas.find()
      .then((alunas) => {
          res.status(200).json(alunas);
      })
      .catch(err => next(err));
}

exports.getById = (req, res) => {
  const id = req.params.id
  Alunas.findById(id)
    .then((aluna) => {
      res.status(200).json(aluna);
  })
  .catch(err => next(err));
}


exports.getSp = (req, res) => {
  Alunas.find({nasceuEmSp: true})
    .then((alunas) => {
      res.status(200).json(alunas);
  })
  .catch(err => next(err));
}


exports.post = async (req, res, next) => { 
  const { nome, password, nasceuEmSp } = req.body;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  try {
    const hashPass = await bcrypt.hashSync(password, salt);

    const novaAluna = new Alunas({
      nome,
      nasceuEmSp,
      hashPass
    });
    novaAluna.save()
      .then((aluna) => {
          res.status(201).json(aluna);
      })
      .catch(err => next(err));
  } catch (e) {
    return res.status(401).json({ error: 'erro' });
  }
}
