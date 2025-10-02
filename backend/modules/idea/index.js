import express from "express";

import { controllers } from "../../src/modules-loader.js";

const router = express.Router();

// define routes using controller handlers
router.get("/", controllers.IdeaController.listIdeasHandler);
router.post("/", controllers.IdeaController.createIdeaHandler);
router.post("/:id/upvote", controllers.IdeaController.upvoteHandler);

export default {
  indexRoute: "/api/ideas",
  router,
};
