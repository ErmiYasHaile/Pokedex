const express = require("express");
const app = express();
const methodOverride = require('method-override'); // Method override
const Pokemon = require("./models/pokemon.js");

// Method override
app.use(methodOverride('_method'));

// middleware
app.use(express.urlencoded({extended: false}));

// INDEX
app.get("/", (req, res) => {
  res.send('')
});

// SHOW
app.get("/:id", (req, res) => {
  res.send('')
});


app.listen(3000, () => {
    console.log('listening')
})