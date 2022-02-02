
//conexion base de datos postgresql usando sequelize
// deben creaar sus propias tablas, no suban las credenciales de la db a git
const {sequelize, User, Post} = require('./models')


    
/*
const { Sequelize } = require('sequelize'); 
const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Example for postgres
// probar la conexion
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
*/
const color = require('colors');
const mate = require('./math.js');
const morgan = require('morgan'); //llamado modulo morgan npm i morgan
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

/*
server.get('/', function(req, res){
     res.send('<h1>Hola MUndo</h1>');
     res.end();

});
*/
//settings
// todo esto se usa en la parte donde el puerto escucha
//palabras reservadas get y set
server.set('AppName','TutoNode'); // nombre de la app
server.set('port', 3000); // puerto de uso
server.set('view engine', 'ejs');




//Middlewares
server.use(express.json()); // hace que expres entienda el formato json
server.use(logger);
server.use(morgan('dev'));
function logger(req,res,next){ //middleware

    
    console.log( `Request Recieved: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}



//routes
server.get('/', (req,res) => {
    const data = [{name: 'olga'},{name: 'ruben'},{name: 'joey'},{name: 'joey'}]
    res.render('index.ejs',{people : data});
});

server.get('/about', (req,res)=>{ // creando la ruta about

    res.send('About me');
      
});

server.all('/user', (req,res,next)=>{
    console.log('por aqui paso');
    
    next();
 
 });
server.get('/user', async (req,res)=>{ // retornando un json

    /* parte vieja del tutorial
    res.send({

        username: 'Cameron',
        lastName: 'Ventes'
    
    });
    */
   //Obtener a todos los usuarios
    try{
        const usuarios = await User.findAll();
        return res.json(usuarios);
           
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error: 'se pifio'});
    }
    
      
});

server.get('/user/:uuid', async (req,res)=>{ // retornando un json
    const uuid = req.params.uuid
    try{
        const usuarios = await User.findOne({

            where: {uuid }
        });
        return res.json(usuarios);
           
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error: 'se pifio en el de uno solo'.red});
    }
    
      
});


server.get('/contact', (req,res)=>{ // creando la ruta about

    res.send('Contactame');
      
});

server.get('/otro', (req,res)=>{ // creando la ruta about

    res.send('<h1>pos que te digo</h1>');
      
});



server.post('/user',async(req,res)=>{ //mostando lo recibido del post en consola
    console.log(req.body);
    //console.log(req.params);
    const {name, email,role} = req.body
    //res.send('REQUEST POST');

    try{

        const user = await User.create({name, email,role});
        
        return res.json(user);
        
    }
    catch(err){
           console.log("aqui se jodio".red, err);
           return res.status(500).json(err);

    }

});

server.put('/aput/:id',(req,res)=>{

    console.log(req.body);
    res.send('User ${req.params.id} updated'); // para acceder al parametro en la url
});

server.delete('/adel',(req,res)=>{

    res.send('delete request');
});

server.post('/post', async(req,res)=>{
    const{userUuid, body} = req.body;  
    try{

      //creo que me va a molestar
      // si no me molesta es porque el orm diferencia entre el modelo User y la tabla usuarios por si solita
      const user = await User.findOne({where: {uuid: userUuid}}); // buscar en el request un usuario igual al userUuid
      const post = await Post.create({body,userId: user.id}); // crear ese post con el usuario encontrado usuario
      return res.json(post);  //retornar el post
    }
    catch(err){

        console.log(err)
        return res.status(500).json(err);
    }

});

server.get('/post', async(req,res)=>{
      
    try{

     const posts = await Post.findAll({include : [{model : User, as: 'user'}]}); //buscar todos los post de un usuario, se modificó el User para que quedara con minuscula
      
      return res.json(posts);  //retornar el post
    }
    catch(err){

        console.log('Se pifio en la funcion de mostrar '.red);
        console.log(err)
        return res.status(500).json(err);
    }

});
// este es un middleware pero debe usarse  al final
server.use(express.static('public'));// uso de express static en caso de que no se acceda a ninguna ruta


///server listen//
server.listen(server.get('port'),async function(){
    await sequelize.authenticate(); // necesario para que surjan los cambios en bd
    console.log(server.get( 'AppName')); // nombre de la app puesto en settings, debe estar olo
    console.log('server on port  '.green, server.get('port'));
    console.log('Database CONECTED! ' )

} );
