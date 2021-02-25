const express = require("express");
const App = express();
const db = require("./db/models");
const cors = require("cors");
const path = require("path");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middleware/passport");
const gymRoutes = require("./routes/gyms");
const typeRoutes = require("./routes/types");
const classRoutes = require("./routes/classes");
const userRoutes = require("./routes/users");

//middleware
App.use(express.json());
App.use(cors());

//passport
App.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

//routes
App.use("/gyms", gymRoutes);
App.use("/types", typeRoutes);
App.use("/classes", classRoutes);

App.use(userRoutes);
App.use("/media", express.static(path.join(__dirname, "media")));

//Not Found
App.use((req, res, next) => {
  next({
    status: 404,
    message: "Path not found",
  });
});

//Error Handling
App.use((error, req, res, next) => {
  res
    .status(error.status || 500)
    .json({ message: error.message || "Internal Server Error" });
});

db.sequelize.sync({ alter: true });
// db.sequelize.sync({ force: true });

App.listen(8000, () => {
  console.log("Application is running");
});
