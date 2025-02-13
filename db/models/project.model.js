//db/models/project.model.js
import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";
import User from "./user.model.js";

const Project = sequelize.define("Project", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  priority: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  userId: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users", 
      key: "id",
    },
  },
});

// Each project/s belongs to a user
Project.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
User.hasMany(Project, { foreignKey: "userId" });

export default Project;