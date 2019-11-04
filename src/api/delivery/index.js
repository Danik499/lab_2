const express = require("express");
const controller = require("./controller.js");
const deliveryApiRouter = new express.Router();

deliveryApiRouter.get("/", controller.deliveryController.get);
deliveryApiRouter.post("/add", controller.deliveryController.post);
deliveryApiRouter.delete("/delete", controller.deliveryController.deleteByStockNumber);



module.exports = {
	apiRouter:deliveryApiRouter
}