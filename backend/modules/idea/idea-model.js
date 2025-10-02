import { DataTypes } from "sequelize";

import sequelize from "../../src/db.js";
import { MAX_TEXT_LENGTH } from "./constants.js";

const Idea = sequelize.define(
  "Idea",
  {
    text: {
      type: DataTypes.STRING(MAX_TEXT_LENGTH || 280),
      allowNull: false,
    },
    upvotes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "ideas",
    timestamps: true, // createdAt, updatedAt
  }
);

// Add expected exported key for modulesLoader
Idea.modelName = "Idea";

export default Idea;
