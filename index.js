const express = require("express");
const axios = require("axios");
const ejsLayouts = require("express-ejs-layouts");
// const rowdy = require("rowdy-logger");
// const rowdyResults = rowdy.begin(app);
// const methodOverride = require("method-override");
// app.use(methodOverride("X-HTTP-Method-Override"));

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(__dirname + "/public/"));

// const db = require("/models");

// GET / - main index of site
app.get("/", (req, res) => {
  let pokemonUrl = "http://pokeapi.co/api/v2/pokemon/?limit=20";
  // Use request to call the API
  axios.get(pokemonUrl).then((apiResponse) => {
    let pokemon = apiResponse.data.results;
    // console.log(pokemon);
    res.render("index", { pokemon: pokemon.slice(0, 151) });
  });
});

// Imports all routes from the pokemon routes file
app.use("/pokemon", require("./routes/pokemon"));

app.listen(port, () => {
  console.log("...listening on", port);
  // rowdyResults.print();
});
