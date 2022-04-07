// import all the necessary packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const taskRoutes = require("./routes/router");

// we are using port 8000
const port = 8000;

const app = express();

//mongodb connection 
mongoose.connect("mongodb+srv://taskAppAdminUser:UH2Y8Fs7rfhCUDIW@cluster0.belmv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{ useNewUrlParser: true})
.then(() => console.log("connection is successfull"))
.catch((error) => console.log(error));

app.use(cors());
app.use(express.json());
app.use(taskRoutes);


// start the server in the port 8000
app.listen(port, () => {
  console.log(`Listening to http://localhost:${port}`);
});

module.exports = app;