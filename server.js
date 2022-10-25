const express = require("express");
const app = express();
const methodOverride = require("method-override"); // Method override
const pokemon = require("./models/pokemon.js");
const Pokemon = require("./models/pokemon.js");

// Method override
app.use(methodOverride("_method"));

// static files
// app.use('/static', express.static('public'))
app.use(express.static("public"));
// middleware
app.use(express.urlencoded({ extended: false }));


// INDEX
// app.get("/", (req, res) => {
//   res.send('<h1>This is the homepage</h1>')
// });
app.get("/Pokemon", (req, res) => {
  // res.send(Pokemon)
  res.render("index.ejs", {
    Pokemons: Pokemon,
  });
});

// NEW
app.get("/pokemon/new", (req, res) => {
  res.render("new.ejs");
});

// SHOW
app.get("/pokemon/:id", (req, res) => {
  //   res.send(Pokemon[req.params.id])
  res.render("show.ejs", {
    Pokemons: Pokemon[req.params.id],
  });
});

// POST
app.post("/pokemon", (req, res) => {
  console.log(req.body);
  Pokemon.push(req.body);
  console.log(Pokemon);
  res.redirect("/pokemon");
});

// DELETE Route
app.delete("/pokemon/:id", (req, res) => {
  console.log("delete route");
  Pokemon.splice(req.params.id, 1);
  res.redirect("/pokemon");
});

// EDIT
app.get("/pokemon/:id/edit", (req, res) => {
  res.render("edit.ejs", {
    Pokemons: Pokemon[req.params.id],
    id: req.params.id,
  });
});

// UPDATE
app.put("/pokemon/:id", (req, res) => {
  //  stats
  Pokemon[req.params.id] = req.body;
  res.redirect("/pokemon");
});

app.listen(3000, () => {
  console.log("listening");
});
