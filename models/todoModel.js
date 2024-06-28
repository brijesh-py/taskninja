import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
      maximum: 200,
    },
    description: {
      type: String,
      maximum: 500,
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
    todoId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

todoSchema.methods.gTodoId = (length = 6) => {
  const chars = "abcdefghijklmnopqrstuvwxyz1234567890";
  let key = "";
  for (let i = 1; i <= length; i++) {
    key += chars[Math.floor(Math.random() * chars.length)];
  }
  return key;
};

export const Todo = mongoose.model("Todo", todoSchema);
