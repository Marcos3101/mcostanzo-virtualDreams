const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, function() {
    console.log('Servidor web escuchando en el puerto 3000');
});

app.post('/AgregarPersonas', function (req, res) {
    var nombre = null;
    var apellido = null;
    var dni = null;

    // Declaración de variables
    if (req.body.hasOwnProperty('nombre')) {
        nombre = req.body.nombre;
    }

    if (req.body.hasOwnProperty('apellido')) {
        apellido = req.body.apellido;
    }

    if (req.body.hasOwnProperty('dni')) {
        dni = req.body.dni;
    }

    // Condiciones
    if ((dni == null || apellido == null) || (dni == 0 || apellido == 0)) {
        res.status(400).end();
        return;
    }

    if (typeof(nombre) != 'string' || typeof(apellido) != 'string') {
        res.status(400).end();
        return;
    }

    if (typeof(dni) != 'number' && dni.toString().length > 10) {
        res.status(400).end();
        return;
    }

    if (req.body.length > 3) {
        res.status(400).end();
        return;
    }


    const http = require('request-promise');

    var datos = {
        method: 'POST',
        uri: 'https://reclutamiento-14cf7.firebaseio.com/personas.json',
        body: {
            nombre: nombre,
            apellido: apellido,
            dni: dni
        },
        json: true
    };

    http(datos)
        .then(repos => {
            console.log(repos);
            res.status(201).send(JSON.stringify(req.body));
        })
        .catch(err => {
            console.error('Error al cargar los datos.', err);
            res.status(500).end();
        });

});