// See http://en.wikipedia.org/wiki/Comma-separated_values
(() => {
"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

const resultTemplate = `
<div class="contenido">
      <table class="center" id="result">
          <% _.each(rows, (row) => { %>
          <tr class="<%=row.type%>">
              <% _.each(row.items, (name) =>{ %>
              <td><%= name %></td>
              <% }); %>
          </tr>
          <% }); %>
      </table>
  </p>
</div>
`;

/* Volcar la tabla con el resultado en el HTML */
const fillTable = (data) => { 
  $("#finaltable").html(_.template(resultTemplate, { rows: data.rows })); 
};

/* Volcar en la textarea de name 
 * #original el contenido del fichero fileName */
const dump = (fileName) => {
    $.get(fileName, function (data) {
      $("#original").val(data);
  });
};
 
const handleFileSelect = (evt) => {
  evt.stopPropagation();
  evt.preventDefault();

  var files = evt.target.files; 

  var reader = new FileReader();
  reader.onload = (e) => {
  
    $("#original").val(e.target.result);
  };
  reader.readAsText(files[0])
}

/* Drag and drop: el fichero arrastrado se vuelca en la textarea de name */
const handleDragFileSelect = (evt) => {
  evt.stopPropagation();
  evt.preventDefault();

    var files = evt.dataTransfer.files;

  var reader = new FileReader();
  reader.onload = (e) => {
  
    $("#original").val(e.target.result);
    evt.target.style.background = "white";
  };
  reader.readAsText(files[0])
}

const handleDragOver = (evt) => {
  evt.stopPropagation();
  evt.preventDefault();
  evt.target.style.background = "#81F7F3";
}

  $(document).ready(() => {
    console.log("entre al ready");

    // comprobar que hay tres elementos para mostrarlos
    let aux =3;
    let original = document.getElementById("original");  
    if (window.localStorage && localStorage.original) {
      original.value = localStorage.original;
    }

    $("#entrar").click( () => {
      if(window.localStorage){
        localStorage.nombre = $("#nombreusu").val();
      }
    });
    /* Request AJAX para que se calcule la tabla */
     $("#parse").click( () => {
        if (window.localStorage) localStorage.original = original.value;
        $.get("/csv", /* Request AJAX para que se calcule la tabla */
          { input: original.value }, 
          fillTable,
          'json'
          );
   });
       // Boton de guardar el contenido del text area
  $("#guardar").click( () => { 
    let dataString = $('#original').val();
      $.get("/mongo/" + $("#nombre").val(),
      {
          text: dataString,
          cont: aux++
      })
        $.get("/mostrarBotones", {}, (readData) => {
              for (var i = 0; i < readData.length; i++) {
                if (readData[i]){
                      $('button.example').get(i).className = "example";
                      $('button.example').get(i).textContent= readData[i].name;
                }
              }
              $("#ejemplo4").fadeIn();
        });
      return false;
  });
  
  $("#refrescar").click(()=>{
    $.get("/botonprueba",
    {
      nombre: window.localStorage.nombre
    }, (ejemplos)=>{
      //console.log("Llege");
      //console.log("nombre del ejemplo: " + ejemplos[0].name);
      //$('button.example').get(0).textContent = ejemplos[0].name;
      for (var i = 0; i < ejemplos.length; i++) {
        if (ejemplos[i]){
          //console.log("id del boton: " + $('button.example').get(i).id);  
          // console.log('#ejemplo'+i);
          $('button.example').get(i).className = "example";
          $('button.example').get(i).textContent= ejemplos[i].name;
          $('#ejemplo'+(i+1)).fadeIn();
        }
      }
    });
    
    
  });
    
   /* botones para rellenar el textarea */
   $('button.example').each( (_,y) => {
    // $(y).click( () => {dump(`${$(y).text()}`); });
    $(y).click( () => {dump(`${$(y).text()}`); 
        $.get("/buscar",{name: $(y).text()},
          (readData) => {
          //console.log("Entre aqui"+ readData[0].text)
          $("#original").val(readData[0].text);
        });
     });
   });
   });
   
    // Setup the drag and drop listeners.
    //var dropZone = document.getElementsByClassName('drop_zone')[0];
    let dropZone = $('.drop_zone')[0];
    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleDragFileSelect, false);
    let inputFile = $('.inputfile')[0];
    inputFile.addEventListener('change', handleFileSelect, false);
    
})();
