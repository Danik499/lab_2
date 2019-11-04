const express = require("express");
const retirement = require("./delivery");
const router = new express.Router();


router.use("/delivery", retirement.apiRouter);

module.exports = {
	router
}