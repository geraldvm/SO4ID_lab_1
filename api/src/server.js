
//https://www.youtube.com/watch?v=bK3AJfs7qNY
const express = require('express'); //Uses express module
const morgan = require('morgan');
const cors = require('cors');  //https://medium.com/zero-equals-false/using-cors-in-express-cac7e29b005b
const app =express();
const PORT = 1616; //Listen Port


//Settings
app.set('port', process.env.PORT || PORT);

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));//Soportar datos de forms
app.use(express.json());//<Soportar JSON
app.use(cors()); //enable cors
//app.use(morgan('combined'));


// routes

app.use('/spaces',require('./routes/spaces'));
app.use('/reservations',require('./routes/reservation'));
//app.use('/',require('./routes/default'));
//app.use('/api/parking', require('./routes/parking'));//poner por defecto la entrada /api/parking
app.use(require('./routes/default'));



// starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});


