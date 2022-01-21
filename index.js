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
/*
const http = require('http');
http.createServer(function (req, res ){ // peticion request req, respuesta  response res
    res.writeHead(200, {'content-type': 'text/html'});// cabecera, e pone un codigo de estado http y el contenido de lo que se se espera (texto html)
    res.write('<h1>Hola mundo desde node js</h1>'); // escibir 
    res.end();

}).listen(3000);
*/

const http = require('http');
const handleserver = function (req, res ){ // peticion request req, respuesta  response res
    res.writeHead(200, {'content-type': 'text/html'});// cabecera, e pone un codigo de estado http y el contenido de lo que se se espera (texto html)
    res.write('<h1>Hola mundo desde node js</h1>'); // escibir 
    res.end();

}

const server  = http.createServer(handleserver);
server.listen(3000, function(){// crea una funncion callback despues de acceder al servidor

    console.log('server on port 3000');
});

