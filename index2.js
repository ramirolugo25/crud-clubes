// const http = require('http');

// const PUERTO = 8080;

// const server = http.createServer((req, res) => {
//   res.writeHead(200);
//   res.end('Hola, mundo!');
// });

// console.log(`escuchando en el puerto ${PUERTO}`);
// server.listen(PUERTO);

//------------------------------------------------------

// const http = require('http');

// const PUERTO = 8080;

// const server = http.createServer((req, res) => {
//   // Ahora queremos devolver HTML así que especificamos en el header que el conte-type es text/html
//   res.writeHead(200, { 'Content-Type': 'text/html' });
//   res.end('<h1>Hola, Mundo!</h1>');
// });

// console.log(`escuchando en el puerto ${PUERTO}`);
// server.listen(PUERTO);

//-------------------------------------------------------


// const http = require('http');
// const url = require('url');

// const server = http.createServer((req, res) => {
//   const pagina = url.parse(req.url).pathname;

//   // este console.log se muestra en la terminal
//   console.log(pagina);
//   // siempre debe pasar antes que el write de la respuesta
//   res.writeHead(200, { 'Content-Type': 'text/html' });

//   res.write(`
//     <!DOCTYPE html>
//     <html>
//     <head>
//     <meta charset='utf-8'> <!-- si comentamos esto, qué pasa? Probar con /sotano en el navegador (no en postman) -->
//     <title>Introducción a Node.js</title>
//     </head>
//     <body>
//   `);

//   switch (pagina) {
//     case '/':
//       res.write('Bienvenidos a mi casa!');
//       break;
//     case '/sotano':
//       res.write('Bienvenido al sótano!');
//       break;
//     case '/patio':
//       res.write('Bienvenido al patio!');
//       break;
//     case '/habitacion':
//       res.write('Qué habitación? Principal o de húesped?');
//       break;
//     case '/habitacion/principal':
//       res.write('Bienvenido a la habitación princpal');
//       break;
//     case '/habitacion/huesped':
//       res.write('Bienvenido a la habitación para huéspedes');
//       break;
//     default:
//       res.write('epa');
//   }
//   res.end('</body></html>');
// });
// server.listen(8080);

//--------------------------------------------------------------------

// en este script vemos cómo usar los códigos de respuesta para indicar éxito o error

// const http = require('http');
// const url = require('url');

// const server = http.createServer((req, res) => {
//   const pagina = url.parse(req.url).pathname;
//   // este console.log se muestra en la terminal
//   console.log(pagina);

//   let respuesta = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//     <meta charset='utf-8'> <!-- si comentamos esto, qué pasa? Probar con /sotano en el navegador -->
//     <title>Introducción a Node.js</title>
//     </head>
//     <body>
//   `;

//   // si no ponemos esto, ver la diferencia en postman
//   res.setHeader('Content-Type', 'text/html');
//   res.statusCode = 200;

//   switch (pagina) {
//     case '/':
//       respuesta += 'Bienvenidos a mi casa!';
//       break;
//     case '/sotano':
//       respuesta += 'Bienvenido al sótano!';
//       break;
//     case '/patio':
//       respuesta += 'Bienvenido al patio!';
//       break;
//     case '/habitacion':
//       respuesta += 'Qué habitación? Principal o de húesped?';
//       break;
//     case '/habitacion/principal':
//       respuesta += 'Bienvenido a la habitación princpal';
//       break;
//     case '/habitacion/huesped':
//       respuesta += 'Bienvenido a la habitación para huéspedes';
//       break;
//     default:
//       res.statusCode = 500;
//       respuesta += 'epa';
//   }

//   respuesta += '</body></html>';
//   res.end(respuesta);
// });
// server.listen(8080);


//-----------------------------------------------------------------------

// esto lo instalamos a través de npm
// const express = require('express');

// const PUERTO = 8080;
// const app = express();

// // app.METODO('/ruta', (request, response) => { })
// app.get('/', (req, res) => {
//   res.end('Hola, mundo!');
// });

// // matchea /patricio, /mauricio, y otros nombres con los que alguna vez confundieron el mío
// app.get(/\/[a-z]{3}ricio$/, (req, res, next) => { // notar el 3er parámetro `next`
//   res.write('Hola');
//   next('este es un parámetro que se le pasa a la siguiente función');
// }, (a, req, res, next) => {
//   console.log(a);
//   res.write(', che!');
//   next();
// }, (req, res) => {
//   res.end(' Chau.');
// });

// app.listen(8080);
// console.log(`Escuchando en el puerto ${PUERTO}`);

//-----------------------------------------------------------------------

// const express = require('express');

// const app = express();

// app.get('/', (req, res) => {
//   // obtiene el parámetro x
//   const x = req.query.x;
//   res.end(`El parámetro x es ${x}`);

// });


// app.get('/usuario/:id', (req, res) => {
//   const id = req.params.id;
//   res.end(`El valor del id de usuario es ${id}`);
// });


// app.get('/equipo/:idEquipo/jugador/:idJugador', (req, res) => {
//   const idEquipo = req.params.idEquipo;
//   const idJugador = req.params.idJugador;
//   res.end(`El valor del id del equipo es ${idEquipo} y el id ${idJugador} es el del jugador`);
// });

// app.get('/hola-mundo', (req, res) => {
//   // res.writeHead(200, { 'Content-Type': 'text/html' });
//   res.end(`
//     <html>
//       <head>
//         <title>Hola mundo</title>
//       </head>
//       <body>
//       </body>
//     </html>
//   `);
// });

// app.listen(8080);

//--------------------------------------------------------------------------

// const express = require('express');

// const PUERTO = 8080;
// const app = express();

// // ejemplo de middleware que hace logging
// app.use((req, res, next) => {
//   console.log(`[${new Date()}] - Llamada a ${req.method} ${req.url}`);
//   next();
// });

// El orden de los middleware importa. El primero que "matchea" es el que vale.

// middleware para requests con content-type: application/json
// app.use(express.json());

// middleware para parsear cualquier request como texto.
// Si pongo este middleware primero, entonces nunca va a usar el de json (porque este atrapa todos)
// app.use(express.text({ type: '*/*' }));

// app.get('/', (req, res) => {
//   res.end('Hola, mundo!');
// });

// app.post('/', (req, res) => {
//   console.log(req.body);
//   res.end(req.body);
// });

// app.all('/todo', (req, res) => {
//   res.send(`Hola! Me llamaste con un ${req.method}`);
// });

// app.put('/prueba-middleware', (req, res) => {
//   res.send(`El body es ${JSON.stringify(req.body)}`);
// });

// app.delete('/borrar', (req, res) => {
//   res.send(`El body es ${JSON.stringify(req.body)}`);
// });

// app.listen(PUERTO);
// console.log(`Escuchando en el puerto ${PUERTO}`);

//--------------------------------------------------------------

// multer es para subir archivos de un form que tiene type enctype multipart/form-data


// nodejs core, fs = filesystem
const fs = require('fs');
const express = require('express');
const multer = require('multer');

const upload = multer({ dest: './uploads/imagenes' });
const exphbs = require('express-handlebars');

const PUERTO = 8080;
const app = express();
const hbs = exphbs.create();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// esto define que el directorio /uploads contiene assets estáticos,
// que se deben servir tal cual están
// notar que no hace falta ir a localhost:8080/uploads
// https://expressjs.com/en/starter/static-files.html
app.use(express.static(`${__dirname}/uploads`));

const nombre = 'Ramiro';

app.get('/', (req, res) => {
  res.render('home_ejemplo', {
    layout: 'ejemplo',
    data: {
      nombre,
      // notar que esta función se ejecuta al renderear la vista, 
      // en el servidor, no en el navegador.
      nombreMayusculas: () => nombre.toUpperCase(),
      listado: [1, 2, 3, 4, 5, 6, 7, 'a'],
      esPar: Math.ceil(Math.random() * 1000) % 2 === 0,
    },
  });
});


app.get('/form', (req, res) => {
  console.log(req.files);
  res.render('form', {
    layout: 'ejemplo',
  });
});

app.post('/form', upload.single('imagen'), (req, res) => {
  console.log(req.file);
  res.render('form', {
    layout: 'ejemplo',
    data: {
      mensaje: 'Éxito!',
      nombreArchivo: req.file.filename,
    },
  });
});

app.get('/equipos', (req, res) => {
  const equipos = fs.readFileSync('./data/equipos.json');
  res.setHeader('Content-Type', 'application/json');
  res.send(equipos);
});

app.listen(PUERTO);
console.log(`Escuchando en http://localhost:${PUERTO}`);
