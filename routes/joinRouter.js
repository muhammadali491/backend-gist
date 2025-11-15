const express = require("express");

const joinRouter = express.Router();

const joinController = require("../controllers/joinController");
// add an item in join
joinRouter.post("/", joinController.addJoin);
// delete an item in gallery

module.exports = joinRouter;
