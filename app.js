"use strict";

const express = require('express');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

// Conexiones con la base de datos mongodb
const util = require('util');
const mongoose = require('mongoose');
// nos conectamos a nuestra base de datos
mongoose.connect('mongodb://localhost/mongodb-mongoose-csv-mena-yeray');
// creamos la tabala con las cabeceras de los datos
const TablaEjemplo = mongoose.Schema({
    "Entrada": String,
    "Producto": String,
    "Precio": String

});
// añadimos la tabla a la base de datos
const Datos = mongoose.model("Datos",TablaEjemplo);
//Prueba de añadir datos a la tabla
  let input0 = new Datos({ name: 'input0', text: '"producto",           "precio"\n"camisa",             "4,3"\n"libro de O\"Reilly", "7,2"' });
  let input1 = new Datos({ name: 'input1', text: '"producto",           "precio"  "fecha"\n"camisa",             "4,3",    "14/01"\n"libro de O\"Reilly", "7,2"     "13/02"'})
  let input2 = new Datos({ name: 'input2', text: '"edad",  "sueldo",  "peso"\n,         "6000€",  "90Kg"\n47,       "3000€",  "100Kg"'})
  

  let p1 = input0.save(function (err, file1) {
    if (err) return console.error(err);
  });
  
  let p2 = input1.save(function (err, file1) {
    if (err) return console.error(err);
  });
  
  let p3 = input2.save(function (err, file1) {
    if (err) return console.error(err);
  });
  
  Promise.all([p1, p2, p3]).then( (value) => { 
    console.log(util.inspect(value, {depth: null}));
    mongoose.connection.close(); 
  });

app.set('port', (process.env.PORT || 5000));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.static(__dirname + '/public'));

const calculate = require('./models/calculate.js');

app.get('/', (request, response) => {     
  response.render('index', { title: "Comma Separated Value Analyzer", error:""});
});

app.get('/csv', (request, response) => {
 response.send({ "rows": calculate(request.query.input) });
});

app.listen(app.get('port'), () => {
    console.log(`Node app is running at localhost: ${app.get('port')}` );
    
app.get('/mongo/:variable', function(req, res) {
 Datos.find({}, function(err, files) {
        if (err)
            return err;
        if (files.length > 3) {
            Datos.find({Entrada: files[req.query.cont % 4].Entrada}).remove().exec();
        }
        let newDatos = new Datos({Entrada: req.params.variable, text: req.query.text});
        newDatos.save(function(err){ 
          if(err) res.send('Algo fallo niño');
          res.send('Bien');
          console.log("Base de datos actualizada")
        });
    });

});

app.get('/mostrarBotones', function(req, res) {
    Datos.find({}, function(err, file) {
        if (err)
            return err;
        res.send(file);
    });
});


app.get('/buscar', function(req, res) {
  console.log("req: " + req.query.Entrada)
  Datos.find({Entrada: req.query.Entrada}, 
        function(err, file) {
            console.log(file);
            res.send(file);
        });
    });
});
