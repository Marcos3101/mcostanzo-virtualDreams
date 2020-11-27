const http = require('request-promise');

var datos = {
    method: 'GET',
    uri: 'https://reclutamiento-14cf7.firebaseio.com/personas.json',
    json: true
};

http(datos)
    .then(repos => {
        console.log(repos);
    })
    .catch(err => {
        console.error(err);
    });