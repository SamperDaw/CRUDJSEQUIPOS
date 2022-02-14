const express = require('express');
require('dotenv').config();
const { dbConnection } = require('../database/config')
const Equipo = require('./equipo');
const Rol = require('./rol');
const bcryptjs = require('bcryptjs');
const { body,validationResult,check} = require('express-validator');
const port = process.env.PORT;
class Server {
    constructor(){
        this.app = express();
        this.conectarDB();
        this.middlewares();
        this.rutas();
    }
    middlewares(){
        this.app.use(express.json())//Middleware para leer json;
        this.app.use(express.static('public'));
        //^Middleware para servir la carpeta public
    }
    async conectarDB(){
        await dbConnection()
    }
    rutas(){
    /******* RUTAS DEL PRODUCTO *****/ 
    this.app.get('/webresources/generic/equipos/:id', async function (req, res) {
        const id = req.params.id;
        let equipo = await Equipo.findById(id);
        res.json(
            equipo

        )
      })
    this.app.get('/webresources/generic/equipos', async function (req, res) {
        let equipos = await Equipo.find();
            res.json(
            equipos
        )
      })
    this.app.post('/webresources/generic/equipos',function (req, res) {
        const body = req.body;
        let miEquipo = new Equipo(body);
        miEquipo.save();
        res.json({
            ok:true,
            msg: 'post API equipos',
            miEquipo
        })
      })
      //put-productos
      this.app.put('/webresources/generic/equipos/:id',async function (req, res) {
        const body = req.body;
        const id = req.params.id;
        await Equipo.findByIdAndUpdate(id,body);
        res.json({
            ok:true,
            msg: 'post API Equipos',
            body
        })
      })
      //delete PRODUCTOS
      this.app.delete('/webresources/generic/equipos/:id', async function (req, res) {
        const id = req.params.id;
        await Equipo.findByIdAndDelete(id);
        res.status(200).json({
            ok:true,
            msg: 'delete API'
        })
      })
    }

    listen(){
        this.app.listen(port, function() { 
            console.log('Escuchando el puerto',port)});
    }
}
module.exports = Server;