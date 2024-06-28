import { Todo } from "../models/todoModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { internalErrorResponse } from "../middlewares/errorHandler.js";

// Create New Todo
export const createTodo = asyncHandler(async (req, res, next) => {
  try {
    const { title, description, completed, _id } = req.body;
    const newTodo = await Todo({ title, description, completed, user: _id });
    newTodo.todoId = await newTodo.gTodoId();
    await newTodo.save();

    res.status(201).json({
      success: true,
      data: {
        title: newTodo.title,
        description: newTodo.description,
        completed: newTodo.completed,
        todoId: newTodo.todoId,
        createdAt: newTodo.createdAt,
      },
      message: "Todo created successfully",
    });
  } catch (error) {
    console.log(error)
    return internalErrorResponse(req, res, next);
  }
});

// Get Todo
// Define the getTodos function with proper async handling
export const getTodos = asyncHandler(async (req, res, next) => {
  try {
    const { _id } = req.body;
    const { q, completed } = req.query;
    const query = { user: _id };

    if (q) {
      const regex = new RegExp(q, "i");
      query.title = regex;
    }

    if (completed && (completed === "true" || completed === "false")) {
      query.completed = completed;
    }

    const todos = await Todo.find(query)
      .limit(10)
      .select("-__v -_id -user -updatedAt");

    return res.status(200).json({
      success: true,
      data: {
        todos,
      },
      message: "Todos fetched successfully",
    });
  } catch (error) {
    // Pass any error to the error handling middleware
    return internalErrorResponse(req, res, next);
  }
});

// Delete Todo
export const deleteTodo = asyncHandler(async (req, res, next) => {
  try {
    const todoId = req.params.todoId;

    if (!todoId) {
      return res.status(400).json({
        success: false,
        error: {
          code: 400,
          message: "Todo id is required",
        },
      });
    }

    const deletedTodo = await Todo.findOneAndDelete({ todoId });
    if (!deletedTodo) {
      return res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: "Todo not found",
        },
      });
    }

    res.status(202).json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    return internalErrorResponse(req, res, next);
  }
});

// Update Todo
export const updateTodo = asyncHandler(async (req, res, next) => {
  try {
    const { title, description, completed } = req.body;
    const todoId  = req.params.todoId;

    if (!todoId) {
      return res.status(400).json({
        success: false,
        error: {
          code: 400,
          message: "Todo id is required",
        },
      });
    }

    const updatedTodo = await Todo.findOneAndUpdate(
      { todoId },
      { title, description, completed },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: "Todo not found",
        },
      });
    }

    res.status(200).json({
      success: true,
      data: {
        title: updatedTodo.title,
        description: updatedTodo.description,
        completed: updatedTodo.completed,
        todoId: updatedTodo.todoId,
        createdAt: updatedTodo.createdAt,
      },
      message: "Todo updated successfully",
    });
  } catch (error) {
    return internalErrorResponse(req, res, next);
  }
});
