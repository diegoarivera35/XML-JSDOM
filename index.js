const express = require("express");
const path = require("path");

const parks = require("./components/parks");
const cameras = require("./components/cameras/cameras");
const placemarks = require("./components/placemarks/placemarks");

const app = express();
const port = process.env.PORT || "7777";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
//set up static path (for use with CSS, client-side JS, and image files)
app.use(express.static(path.join(__dirname, "public")));

// app.get("/", async (request, response) => {
//   //await cameras.loadCameras();
//   let data = await parks.loadParks();
//   response.render("index", { title: "Home", parks: data });
// });
/* app.get("/park/:id", async (request, response) => {
  response.render("park", { title: "Park" });
}); */

app.get("/", async (request, response) => {
  let data = await placemarks.loadPlacemarks();// contains an array of libraries (Placemark)
  response.render("index", { title: "Placemarks", placemarks: data });
});

app.get("/placemark/:id", async (request, response) => {
  let l = await placemarks.getPlacemarkById(request.params.id);
  response.render("placemark", { title: "Placemark", placemark: l });
}); 

//server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});