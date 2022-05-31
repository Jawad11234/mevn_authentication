const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const passport = require("passport");

// Inintilize the app
const app = express();
///////////////////////////////////////////////////////
// Middlewares
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());
app.use(cors());

app.use(passport.initialize());
require("./config/passport")(passport);
///////////////////////////////////////////////////////
// Using Path module
app.use(express.static(path.join(__dirname, "public")));
/////////////////////////////////////////////////////////////
// Database Configuration
const db = require("./config/keys").mongodbURI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log(`Database Connected Successfully:: ${db}`);
  })
  .catch((err) => {
    console.log(`Some error occurs:: ${err}`);
  });
////////////////////////////////////////////////////////////
// Bringing the user route here
const users = require("./routes/api/users");
app.use("/api/users", users);
///////////////////////////////////////////////////////////
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});
// Assing the Port for listenig the API Call
const PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res) => {
  console.log(`App is listening at Port ${PORT}`);
});
