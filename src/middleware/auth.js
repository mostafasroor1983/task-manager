const jwt = require("jsonwebtoken");
const { ConnectionClosedEvent } = require("mongodb");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decodedData);
    const user = await User.findOne({
      _id: decodedData._id,
      "tokens.token": token,
    });

    console.log(user)
    // keeping the user in request so that we can grab it back from router
    req.user = user;
    req.token = token;
    
    if (user) next();
    else res.status(401).send("please authenticate...");

  } catch (e) {
    res.status(401).send("please authenticate...");
  }
};

module.exports = auth;
