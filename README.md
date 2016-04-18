# Práctica 8: Comma separated values (CSV) with AJAX

## jQuery.get( url [, data ] [, success ] [, dataType ] )
* url
  * Tipo: String
  * Una cadena con la URL a la cual es enviada la petición.
* data
  * Tipo: PlainObject o String
  * Un objeto plano o una cadena que es enviada al servidor con la petición.
* success
  * Tipo: Function.
  * Un callback que es ejecuado cuando la petición es exitosa. 
* dataType
  * Tipo: String
  * El tipo de dato que se espera del servidor.

## jQuery.get( [settings ] )
* settings
  * Tipo: PlainObject
  * Parejas clave/valor que configuran la petición ajax. 
  * La única propiedad que no es opcional es url. 

Pequeño ejemlo con ajax:

```javascript
$.ajax({
  url: url,
  data: data,
  success: success,
  dataType: dataType
});
```

Al callback se le pasan los datos retornados por el servido, que estarán en XML, Javascript, Json o en una cadena de texto. También se le pasa un texto con el estado de la respuesta.

[## _Campus Virtual de la Asignatura_](https://campusvirtual.ull.es/1516/course/view.php?id=144)
[## Descripción de la práctica](https://campusvirtual.ull.es/1516/mod/page/view.php?id=189370)

[## Repo](https://github.com/alu0100783612/ajax-ecma6-ficheros-mena-yeray)
[## Fork](https://github.com/ULL-ESIT-GRADOII-DSI/ajax-ecma6-ficheros-mena-yeray)
[## Heroku](http://csvajax-yeray-mena.herokuapp.com/) 


[## Yeray Pérez Peraza](http://alu0100783612.github.io/)
[## José Alberto Mena Gacía](http://alu0100768893.github.io/)

