const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

const dbURI =
  "mongodb+srv://dododev:seucu123@nodetuts.3clwcle.mongodb.net/nodetuts?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000)) //listen for requests
  .catch((err) => console.log(err));

app.set("view engine", "ejs"); //register view engine

app.use(express.static("public")); // middleware & static files
app.use(express.urlencoded({ extended: true })); // middleware responsável por passar a informação que recebemos do navegador em um formato adequado para trabalharmos
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  //   res.send("<p>about page</p>");
  res.render("about", { title: "about" });
});

app.use("/blogs", blogRoutes); //blog routes

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
