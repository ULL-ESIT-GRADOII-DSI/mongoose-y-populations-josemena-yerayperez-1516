(function(exports){
    "use strict";
    
      // Conexiones con la base de datos mongodb
  const util = require('util');
  const mongoose = require('mongoose');
  // nos conectamos a nuestra base de datos
  
  mongoose.connect('mongodb://localhost/mongodb-mongoose-csv-mena-yeray');
  
  const UsuarioSchema = mongoose.Schema({
      "nombre": String,
      "ejemplo": [{ type: mongoose.Schema.Types.ObjectId, ref: 'Datos' }]
  });
  
  const TablaEjemplo = mongoose.Schema({
      "_creator": { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
      "name": String,
      "text": String
  });
  
  
  // añadimos la tablas a la base de datos
  const Usuario = mongoose.model("Usuario",UsuarioSchema);
  const Datos = mongoose.model("Datos",TablaEjemplo);

  Usuario.remove({}).then(()=>{
    Datos.remove({}).then(()=>{
      let mena = new Usuario({nombre: 'Mena'});
      let yeray = new Usuario({nombre: 'Yeray'});
      
      mena.save(function(err){
        if(err) return console.log(err);
        
            let ejemplo1mena = new Datos({
              _creator: mena._id, 
              name: 'ejemplo1mena', 
              text: '"tu padre",           "soy yo"\n"no es tu padre",             "pero no soy yo"\n"es tu padre", "pero soy yo"'
              
            });
            ejemplo1mena.save(function(err){
              if(err) return console.log(err);
            });
            let ejemplo2mena = new Datos({
              _creator: mena._id, 
              name: 'ejemplo2mena', 
              text: '"hola",           "caracola"\n"tongo",             "en el sorteo"\n"de la", "champions"'
              
            });
            ejemplo2mena.save(function(err){
              if(err) return console.log(err);
            });
      });
      yeray.save(function(err){
        if(err) return console.log(err);
        
            let ejemplo1yeray = new Datos({
              _creator: yeray._id, 
              name: 'ejemplo1yeray', 
              text: '"tumadre",           "es ella"\n"es tu madre",             "pero no es ella"\n"es tu padre", "pero es ella"'
              
            });
            ejemplo1yeray.save(function(err){
              if(err) return console.log(err);
            });
            let ejemplo2yeray = new Datos({
              _creator: yeray._id, 
              name: 'ejemplo2yeray', 
              text: '"el madrid",           "es una caca"\n"le gano",             "al chincanayro"\n"en semis", "de la champions"'
              
            });
            ejemplo2yeray.save(function(err){
              if(err) return console.log(err);
            });
            let ejemplo3yeray = new Datos({
              _creator: yeray._id, 
              name: 'ejemplo3yeray', 
              text: '"esto",           "esta saliendo"\n"de puta",             "madre"\n"hola", "papito"'
              
            });
            ejemplo3yeray.save(function(err){
              if(err) return console.log(err);
            });
      });
    });
  });
  
module.exports = {Datos: Datos, Usuario: Usuario};

})(); 