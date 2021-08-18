
//https://www.youtube.com/watch?v=bK3AJfs7qNY
const express = require('express'); //Uses express module
const morgan = require('morgan');
const cors = require('cors');  //https://medium.com/zero-equals-false/using-cors-in-express-cac7e29b005b
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const https = require('https');
const http = require('http')
const fs = require('fs');

const app = express();
const PORT = 1616; //Listen Port
const httpPort = 81;

const options = {
    key: fs.readFileSync(__dirname + '/localhost.decrypted.key', 'utf8'),
    cert: fs.readFileSync(__dirname + '/localhost.crt', 'utf8')
};

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            version: "1.0.0",
            title: "API parqueo",
            description: "API para el manejo de reservas en el parqueo del TEC",
            contact: {
                name: "Karina Martínez",
                name: "Gerald Valverde"
            },
            servers: ["http://localhost:1616"]
        }
    },
    apis: ['./src/routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


//Settings
app.set('port', process.env.PORT || PORT);

//middlewares
app.use(cors()); //enable cors
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));//Soportar datos de forms
app.use(express.json());//<Soportar JSON
//app.use(morgan('combined'));


// routes

app.use('/spaces', require('./routes/spaces'));
app.use('/reservations', require('./routes/reservation'));
//app.use('/',require('./routes/default'));
//app.use('/api/parking', require('./routes/parking'));//poner por defecto la entrada /api/parking
app.use(require('./routes/default'));

const httpServer = http.createServer(app);
const httpsServer = https.createServer(options, app);

app.use((req, res, next) => {
    if (req.protocol === 'http') {
        res.redirect(301, `https://${req.headers.host}${req.url}`);
    }
    next();
});

httpServer.listen(httpPort, 'localhost');
httpsServer.listen(PORT, 'localhost', () => {
    console.log('server running at ' + PORT)
})

// starting the server
/*app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});*/


