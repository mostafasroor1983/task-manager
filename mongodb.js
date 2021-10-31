//CRUD operations

// destructring
const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

const id = ObjectID();
console.log(id);
// Asuchronous
MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error)
      return console.log("Unable to connect to database " + connectionURL);
    console.log("connection success");
    const db = client.db(databaseName);


  }
);

// Asuchronous
// db.collection("users").insertOne(
//   {
//     //_id: id,
//     name: "mostafa",
//     age: 38,
//   },
//   (error, result) => {
//     if (error) return console.log("Unable to document " + error);
//     console.log(result);
//   }
// );

// db.collection("users").insertMany(
//   [
//     {
//       name: "wael",
//       age: 45,
//     },
//     {
//       name: "malek",
//       age: 49,
//     },
//   ],
//   (error, result) => {
//     if (error) return console.log("Unable to documents " + error);
//     console.log(result);
//   }
// );

// db.collection("tasks").insertMany(
//   [
//     {
//       description: "shopping grocerry",
//       completed: true,
//     },
//     {
//       description: "cleaning the floor",
//       completed: false,
//     },
//     {
//       description: "washing the dishes",
//       completed: false,
//     },
//   ],
//   (error, result) => {
//     if (error) return console.log("Unable to documents " + error);
//     console.log(result);
//   }
// );
// db.collection("users").findOne(
//   { _id: ObjectID("617aef4684f83744cf37199e") },
//   (error, user) => {
//     if (error) return console.log("Unable to find user " + error);
//     console.log(user);
//   }
// );

// db.collection("users")
//   .find({ name: "mostafa" })
//   .toArray((error, users) => {
//     if (error) return console.log("Unable to find users");
//     console.log(users);
//   });

// db.collection("users")
//   .find({ name: "mostafa" })
//   .count((error, count) => {
//     if (error) return console.log("Unable to find users count");
//     console.log(count);
//   });

// db.collection("tasks").findOne(
//   { _id: ObjectID("617af0e0693668a2ba25fa1d") },
//   (error, task) => {
//     if (error) return console.log("Unable to find task");
//     console.log(task);
//   }
// )

// db.collection('tasks').find({completed:false}).toArray((error, tasks)=>{
//   console.log(tasks);
// })
//     db.collection("users")
    //       .updateOne(
    //         {
    //           _id: ObjectID("617ae74a27d66ca214f451d4"),
    //         },
    //         {
    //           $set: {
    //             name: "sroor",
    //           },
    //         }
    //       )
    //       .then((result) => console.log(result))
    //       .catch((error) => console.log(error));

    // db.collection("users")
    //   .updateMany(
    //     {
    //       name: "mostafa",
    //     },
    //     {
    //       $set: {
    //         age: 37,
    //       },
    //     }
    //   )
    //   .then((result) => console.log(result))
    //   .catch((error) => console.log(error));

    
    // db.collection("users").deleteMany({age:37})
    // .then((result) => {
    //   console.log(result);
    // })
    // .catch((error) =>{
    //   console.log(error)
    // })