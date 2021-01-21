const express = require("express");

const HistoryController = require("./app/controllers/HistoryController");
const MessageController = require("./app/controllers/MessageController");
const Key = require("./app/middlewares/Key");

const routes = express.Router();

routes.get("/", function (request, response, next) {
  try {
    if (process.env.NODE_ENV === "development") {
      return response.json({
        application: process.env.APP_NAME,
        developer: "Lisma Team"
      });
    } else {
      return response.redirect(process.env.URL_WEB);
    }
  } catch (error) {
    next(error);
  }
});

routes.use(Key.Authentication);

routes.get("/api/messages", MessageController.listAllMessages);
routes.post("/api/messages", MessageController.createMessage);
routes.delete("/api/messages/:message_id", MessageController.deleteMessageById);

routes.get("/api/history", HistoryController.listAllHistory);
routes.post("/api/history", HistoryController.createHistory);

module.exports = routes;