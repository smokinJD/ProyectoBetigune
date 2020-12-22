'use strict';

console.log('init');

//modulos importados
const express = require('express');
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

//llamada a express js
const app = express();

//llamada a la BD Mongo
const url = 'mongodb://127.0.0.1:27017';

const dbName = 'consultas';
let db;

MongoClient.connect(url, { useUnifiedTopology: true })
    .then(client => {
        db = client.db(dbName);
        console.log(`Connected MongoDB: ${url}`);
        console.log(`Database: ${dbName}`);

        const consultaCollection = db.collection('consulta');

        // Body parser para recoger datos del body de un form
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(express.static(__dirname));

        app.listen(3000, function () {
            console.log('listening on 3000')
        });

        app.get('/', function (req, res) {
            // redirigp a index.html
            res.sendFile(__dirname + '/index.html')
        });

        //post response en el cual se inserta en la BD la consulta
        app.post('/form', (req, res) => {
            console.log(req.body)

            consultaCollection.insertOne(req.body)
                .then(result => {
                    console.log(result)
                    res.redirect('/')
                })
                .catch(error => console.error(error))

        })

        //post response en el cual se inserta en la BD la consulta
        app.get('/consultas', (req, res) => {
            const cursor = consultaCollection.find().toArray()
                .then(results => {
                    console.log(results)
                })
                .catch(error => console.error(error))
        })
    })
    .catch(error => console.error(error));




