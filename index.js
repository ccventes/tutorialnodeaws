
const color = require('colors');
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
/*
const http = require('http');
const handleserver = function (req, res ){ // peticion request req, respuesta  response res
    res.writeHead(200, {'content-type': 'text/html'});// cabecera, e pone un codigo de estado http y el contenido de lo que se se espera (texto html)
    res.write('<h1>Hola mundo desde node js</h1>'); // escibir 
    res.end();

}

const server  = http.createServer(handleserver);
server.listen(3000, function(){// crea una funncion callback despues de acceder al servidor

    console.log('server on port 3000' .green);
});
*/
const express = require('express');
const res = require('express/lib/response');
const { append } = require('express/lib/response');
const server  = express();
server.get('/', function(req, res){
     res.send('<h1>Hola MUndo</h1>');
     res.end();

});
server.use(express.json()); // hace que expres entienda el formato json

server.get('/about', (req,res)=>{ // creando la ruta about

    res.send('About me');
      
});

server.all('/user', (req,res,next)=>{
    console.log('por aqui paso');
    
    next();
 
 });
server.get('/user', (req,res)=>{ // retornando un json

    res.send({

        username: 'Cameron',
        lastName: 'Ventes'
    
    });
      
});



server.get('/contact', (req,res)=>{ // creando la ruta about

    res.send('Contactame');
      
});

server.get('/otro', (req,res)=>{ // creando la ruta about

    res.send('<h1>pos que te digo</h1>');
      
});



server.post('/user/:id',(req,res)=>{ //mostando lo recibido del post en consola
    console.log(req.body);
    console.log(req.params);
    res.send('REQUEST POST');
});

server.put('/aput/:id',(req,res)=>{

    console.log(req.body);
    res.send('User ${req.params.id} updated'); // para acceder al parametro en la url
});

server.delete('/adel',(req,res)=>{

    res.send('delete request');
});



server.listen(5000,function(){
    console.log('server on port 5000'.green)

} );
