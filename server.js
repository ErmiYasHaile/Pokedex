const express = require("express");
const app = express();
const methodOverride = require("method-override"); // Method override
//const pokemon = require("./models/pokemon.js");
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

//keep your letting casing consistent
app.get("/pokemon", (req, res) => {
  // res.send(Pokemon)
  res.render("index.ejs", {
    Pokemons: Pokemon,
  });
});

// NEW
app.get("/pokemon/new", (req, res) => {
  res.render("new.ejs");
});



// POST
app.post("/pokemon", (req, res) => {
  //i would just make one object
  let newPokemon = {
    name: req.body.name,
    img: req.body.img,
    type: req.body.type,
    stats: {
      hp: req.body.hp,
      attack: req.body.attack,
      defence: req.body.defence,
      spattack: req.body.spattack,
      spadefence: req.body.spdefence,
      speed: req.body.speed,
    },

}
  console.log(req.body);
  Pokemon.push(newPokemon);
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
  // console.log((req.params.id))
  res.render("edit.ejs", {
    Pokemons: Pokemon[req.params.id],
    id: [req.params.id],
  });
});

// UPDATE
app.put("/pokemon/:id", (req, res) => {
  //i would make one oject
  let editPokemon = {
    name: req.body.name,
    img: req.body.img,
    type: req.body.type,
    stats: {
      hp: req.body.hp,
      attack: req.body.attack,
      defence: req.body.defence,
      spattack: req.body.spattack,
      spadefence: req.body.spdefence,
      speed: req.body.speed,
    },

}
  Pokemon[req.params.id] = editPokemon
   //not sure why the below is still in the code?
  //Pokemon[req.params.id] = req.body;
  //i would redirect to the show so the user can see new changes
  res.redirect(`/pokemon/${req.params.id}`);
});

//this always needs to be the last route
// SHOW
app.get("/pokemon/:id", (req, res) => {
  //   res.send(Pokemon[req.params.id])
  res.render("show.ejs", {
    Pokemons: Pokemon[req.params.id],
  });
});
app.listen(3000, () => {
  console.log("listening");
});
