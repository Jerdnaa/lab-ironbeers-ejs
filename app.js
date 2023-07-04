const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);

app.use(express.static(path.join(__dirname, 'public')));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get("/beers", (req, res) => {
  punkAPI
  .getBeers()
  .then(beersFromApi => {
    res.render("beers", {data: beersFromApi});
  })
  .catch(error => console.log(error));
})

app.get("/random-beer", (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromApi => {
      res.render("randombeer", {data: responseFromApi});
    })
})

app.get("/beers/:id", (req, res) => {
  const beerId = req.params.id;
  const betterBeerId = beerId.slice(5)
  console.log(betterBeerId)
  punkAPI
  .getBeer(betterBeerId)
  .then(theBeerFromApi => {
    console.log(theBeerFromApi)
    res.render("beerDescription", {data: theBeerFromApi})
  })
})




app.listen(3000, () => console.log('🏃‍ on port 3000'));
