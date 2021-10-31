const mongoose = require("mongoose");

const connectionURL = process.env.DB_CONNECTION_URL;

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
});

module.exports = {
  mongoose:mongoose
}

// const me = new User({
//   name: "  Ghazi  ",
//   email: "ghazi@gmail.com",
//   password: "ghazi1234",
// });

// me.save()
//   .then(() => {
//     console.log(me);
//   })
//   .catch((error) => {
//     console.log(error);
//   });



// const t1 = new Task({
//   description: "cleaning the house"
// });

// t1.save()
//   .then(() => {
//     console.log(t1);
//   })
//   .catch((err) => {
//     console.log(error);
//   });
