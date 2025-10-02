import { models } from "../../src/modules-loader.js";

const listIdeas = async () => {
  // newest first
  return models.Idea.findAll({
    order: [["createdAt", "DESC"]],
  });
};

const createIdea = async (text) => {
  return models.Idea.create({ text });
};

const upvoteIdea = async (id) => {
  const idea = await models.Idea.findByPk(id);
  if (!idea) return null;
  idea.upvotes += 1;
  await idea.save();
  return idea;
};

export default {
  serviceName: "IdeaService",
  listIdeas,
  createIdea,
  upvoteIdea,
};
