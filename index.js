const express = require('express');
const genre = require('./routes/genre');

const port = process.env.port || 3000;

const app = express();

app.get('/', (req, res, next)=>{
    return res.status(200).send({
        message:"...Connected"
    });
});

app.use(genre);

app.use('*', (req, res, next)=>{
    let err = new Error('Page not found');
    err.status = 404;
    return next(err);
});

app.use((err, req, res, next)=>{
    console.trace(err);
    res.status(err.status || 500).send({
        message : err.message
    });
});

app.listen(port, ()=>{
    console.log('Touch down on port ', port);
});