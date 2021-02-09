const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

try {
    const uri = process.env.ATLAS_URI;
//const uri = "mongodb+srv://dbAdmin:eRc09oXGHJQqXIwU@realmcluster.tze3d.mongodb.net/capstonedb?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
} catch (error) {
    console.log("error:"+error);
}
