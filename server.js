// import all the necessary packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const path = require('path');
const taskRoutes = require("./routes/router");
const config = require('./config');

// we are using port 8000
const port = process.env.PORT || 8000;

const app = express();

//mongodb connection 
mongoose.connect(config.MONGODB_CONNECTION_URL,{ useNewUrlParser: true})
.then(() => console.log("connection is successfull"))
.catch((error) => console.log(error));

app.use(cors());
app.use(express.json());
app.use('/api', taskRoutes);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('./client/dist'));
  app.get('*', (req, res)=> {
    res.sendFile(path.resolve(process.cwd(), 'client', 'dist', 'index.html'))
  })
}

// start the server in the port 8000
app.listen(port, () => {
  console.log(`Listening to ${port}`);
});

module.exports = app;