const express = require("express");
const getData = require("../controllers/controller");

module.exports = function (app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(`/api/data`, (req, res) => getData(req, res));

  app.get("/", (req, res) => res.send("HOMEPAGE!"));
  app.all("*", (req, res) => res.status(404).send("NOT FOUND"));
};
