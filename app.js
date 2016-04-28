"use strict";

const express = require('express');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const Datos = require('./models/pruebaConexion.js');


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
            Datos.remove({name: files[3].name}).exec();
        }
        let newDatos = new Datos({name: req.params.variable, text: req.query.text});
        newDatos.save(function(err){ 
          if(err) res.send('Algo fallo niño');
          res.send('Bien');
          console.log("Base de datos actualizada");
          console.log("Nombre:" + newDatos.name );
          console.log("Datos: " + newDatos);
        });
    });

});

app.get('/mostrarBotones', function(req, res) {
    Datos.find({}, function(err, file) {
        if (err)
            return err;
        console.log("file: " + file);
        res.send(file);
    });
});


app.get('/buscar', function(req, res) {
  console.log("req: " + req.query.name)
  Datos.find({name: req.query.name}, 
        function(err, file) {
            console.log(file);
            res.send(file);
        });
    });
});
