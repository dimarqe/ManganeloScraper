const express = require('express');
const scraper = require('./routes/mangaScraper');

const port = process.env.port || 3000;

const app = express();

app.use(scraper);

app.listen(port, ()=>{
    console.log('Touch down on port ', port);
});