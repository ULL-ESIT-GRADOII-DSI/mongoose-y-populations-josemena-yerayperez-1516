(function(exports){
    "use strict";
    
    // Conexiones con la base de datos mongodb
const util = require('util');
const mongoose = require('mongoose');
// nos conectamos a nuestra base de datos

mongoose.connect('mongodb://localhost/mongodb-mongoose-csv-mena-yeray');
// creamos la tabala con las cabeceras de los datos./
const TablaEjemplo = mongoose.Schema({
    "name": String,
    "text": String
});
const UsuarioSchema = mongoose.Schema({
    "nombre": String,
    //"ejemplo": { type: Schema.Types.ObjectId, ref: 'Usuario' }
});
// añadimos la tablas a la base de datos
const Usuario = mongoose.model("Usuario",UsuarioSchema);
const Datos = mongoose.model("Datos",TablaEjemplo);
//Incluimos los datos en la tabla de datos
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
    // mongoose.connection.close(); 
  });
  
module.exports = Datos;
module.exports = Usuario;
})()  