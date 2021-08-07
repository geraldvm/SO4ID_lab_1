
//https://www.youtube.com/watch?v=bK3AJfs7qNY
const express = require('express'); //Uses express module
const morgan = require('morgan');
const app =express();
const PORT = 1616; //Listen Port


let spaces= [{
    "id": 1,
    "state": 23}
]
//Settings
app.set('port', process.env.PORT || PORT);

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));//Soportar datos de forms
app.use(express.json());//<Soportar JSON
//app.use(morgan('combined'));


// routes
app.use(require('./routes'));
app.use('/spaces',require('./routes/parking'));
//app.use('/api/parking', require('./routes/parking'));//poner por defecto la entrada /api/parking




// starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});



//In function get have a req:request and res: response
app.get('/',function(req, res){
    res.send('It´s a main page');
    console.log('It´s a main page');
});


//In function get have a req:request and res: response
app.get('/spaces',function(req, res){
    res.send(getMeters().row);
    console.log('Get meters');
    sole.log(e);
    
});

//Get Meters Function
const getMeters = async () => {
    try {
        const res = await pool.query('select * from meter');
        // console.log(res)
        console.log(res.rows);
    } catch (e) {
        console.log(e);
    }
};