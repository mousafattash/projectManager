// db/models/task.model.js
import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";
import Project from "./project.model.js";

const Task = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    // Added priority column
    priority: {
      type: DataTypes.ENUM("Low", "Medium", "High"),
      allowNull: true,
      defaultValue: "Medium",
    },
    status: {
      type: DataTypes.ENUM("to-do", "in_progress", "done"),
      defaultValue: "to-do",
      allowNull: false,
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Project,
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    timestamps: true,
    tableName: "tasks",
  }
);


Project.hasMany(Task, { foreignKey: "projectId", onDelete: "CASCADE" });
Task.belongsTo(Project, { foreignKey: "projectId" });

export default Task;
