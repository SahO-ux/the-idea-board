import { services } from "../../src/modules-loader.js";
import { MAX_TEXT_LENGTH } from "./constants.js";

const listIdeasHandler = async (req, res) => {
  try {
    const ideas = await services.IdeaService.listIdeas();
    res.json(ideas);
  } catch (err) {
    console.error("listIdeasHandler", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createIdeaHandler = async (req, res) => {
  try {
    const raw = req.body?.text;
    const text = raw ? String(raw).trim() : "";
    if (!text) return res.status(400).json({ error: "text is required" });
    if (text.length > MAX_TEXT_LENGTH)
      return res
        .status(400)
        .json({ error: `Upto ${MAX_TEXT_LENGTH} chararacters are supported` });

    const idea = await services.IdeaService.createIdea(text);

    delete idea.dataValues.updatedAt; // not needed

    // Emit to connected clients if socket exists
    try {
      if (services.io) services.io.emit("idea:created", idea);
    } catch (e) {
      console.warn("Socket emit failed", e);
    }

    res.status(201).json(idea);
  } catch (err) {
    console.error("createIdeaHandler", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const upvoteHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const idea = await services.IdeaService.upvoteIdea(id);
    if (!idea) return res.status(404).json({ error: "Idea not found" });

    try {
      if (services.io)
        services.io.emit("idea:upvoted", {
          id: idea.id,
          upvotes: idea.upvotes,
        });
    } catch (e) {
      console.warn("Socket emit failed", e);
    }

    res.json({ id: idea.id, upvotes: idea.upvotes });
  } catch (err) {
    console.error("upvoteHandler", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default {
  controllerName: "IdeaController",
  listIdeasHandler,
  createIdeaHandler,
  upvoteHandler,
};
