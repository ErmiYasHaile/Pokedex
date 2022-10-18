const express = require("express");
const app = express();
const methodOverride = require('method-override'); // Method override
const Pokemon = require("./models/pokemon.js");

// Method override
app.use(methodOverride('_method'));

// middleware
app.use(express.urlencoded({extended: false}));

// INDEX
// app.get("/", (req, res) => {
//   res.send('<h1>This is the homepage</h1>')
// });
app.get("/Pokemon", (req, res) => {
    // res.send(Pokemon)
    res.render('index.ejs',{
        Pokemons: Pokemon
    })
  });


// NEW 
app.get('/pokemon/new',(req, res)=>{
    res.render('new.ejs')
})

// SHOW
app.get("/pokemon/:id", (req, res) => {
//   res.send(Pokemon[req.params.id])
    res.render('show.ejs',{
        Pokemons: Pokemon[req.params.id]
    })
});

// POST
app.post('/pokemon',(req, res)=>{
    console.log(req.body)
    Pokemon.push(req.body)
    console.log(Pokemon)
    res.redirect('/pokemon')
  })



app.listen(3000, () => {
    console.log('listening')
})