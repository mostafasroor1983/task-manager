const express = require("express");
const Task = require("../models/task");
const router = new express.Router();
const auth = require("../middleware/auth");

router.post("/tasks", auth, async (req, res) => {
  try {
    const task1 = new Task({
      ...req.body,
      owner: req.user._id,
    });
    await task1.save();
    res.status(201).send(task1);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/tasks", auth, async (req, res) => {
  const completed = req.query.completed;
  let taskParam = { owner: req.user._id };
  let options = {};
  let sort = {};

  if (completed) taskParam = { ...taskParam, completed: completed === "true" };
  if (req.query.limit)
    options = { ...options, limit: parseInt(req.query.limit) };
  if (req.query.skip) options = { ...options, skip: parseInt(req.query.skip) };
  if (req.query.skip) options = { ...options, skip: parseInt(req.query.skip) };

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
    options = { ...options, sort };
  }

  console.log(options);
  try {
    const tasks = await Task.find(taskParam, null, options);
    //await req.user.populate("tasks").execPopulate();
    if (tasks.length > 0) res.status(200).send(tasks);
    else res.status(204).send([]);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  try {
    const _id = req.params.id;
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) return res.status(404).send();
    return res.status(200).send(task);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  const updateFields = Object.keys(req.body);
  const allowedUpdateFields = ["description", "completed"];
  const isValidOperation = updateFields.every((field) => {
    return allowedUpdateFields.includes(field);
  });

  if (!isValidOperation)
    return res.status(400).send({ error: "Not valid update fields..." });

  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) return res.status(404).send();

    updateFields.forEach((field) => {
      task[field] = req.body[field];
    });
    await task.save();
    res.status(202).send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOneAndDelete({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
