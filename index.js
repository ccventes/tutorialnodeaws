const mate = require('./math.js');
console.log(mate);
const os = require('os');
console.log(os.platform());
console.log(os.release());
console.log('free mem', os.freemem());
const fs = require('fs');
fs.writeFile('./texto.txt', 'la persona que me gusta es: ', function(err){ // ubicacion del archivo, menaje a escribir, funcion callback para aber el error
     
    if(err){
       console.log(err);

    }
    else{

        console.log('No se habla de bruno nonono');
    }
});


console.log('ultima linea de codigo');

fs.readFile('./texto.txt',  function(err,data){ // ubicacion del archivo,  funcion callback para saber el error o leer lo datos
     
    if(err){
       console.log(err);

    }
    else{

        console.log(data.toString());
    }
});
