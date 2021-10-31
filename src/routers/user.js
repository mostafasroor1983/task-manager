const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const auth = require("../middleware/auth");
const multer = require("multer");
const sendEmail = require("../emails/accounts");
router.post("/users/logout", auth, async (req, res) => {
  try {
    const userParam = req.user;
    const tokenParam = req.token;
    userParam.tokens = userParam.tokens.filter((token) => {
      return token.token != tokenParam;
    });

    await userParam.save();
    res.send(userParam);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    const user = req.user;
    user.tokens = [];
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentails(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken();
    return res.status(200).send({ user, token });
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
});

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  sendEmail(user.email, user.name, "Thank you for registering in our task manager app");
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.patch("/users/me", auth, async (req, res) => {
  const updateFields = Object.keys(req.body);
  const allowedUpdateFields = ["name", "age", "email", "password"];
  const isValidOperation = updateFields.every((field) => {
    return allowedUpdateFields.includes(field);
  });

  if (!isValidOperation)
    return res.status(400).send({ error: "Not valid update fields..." });

  try {
    // This concept of saving just to work with middlewar pre
    const user = req.user; //await User.findById(req.params.id);
    updateFields.forEach((field) => {
      user[field] = req.body[field];
    });

    await user.save();
    res.status(202).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  const user = req.user;
  sendEmail(user.email, user.name, "We will miss you, try again soon...");
  try {
    await user.remove();
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
      return new cb(new Error("Please upload an image..."));
    }
    cb(undefined, true);
  },
});

router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    req.user.avatar = req.file.buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, nexr) => {
    res.status(400).send({ error: error.message });
  }
);

router.delete("/users/me/avatar", auth, async (req, res) => {
  try {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/users/me/avatar", auth, async (req, res) => {
  try {
    if (!req.user.avatar) throw new Error("Avatar not found...");
    res.set("Content-Type", "image/jpg");
    res.send(req.user.avatar);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
