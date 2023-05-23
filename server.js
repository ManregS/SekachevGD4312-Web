const express = require("express");
const http = require("http"); 
const mongoose = require("mongoose");
const ClientsController = require("./controller/ClientsController.js");
const UsersController = require("./controller/UsersController.js");

var app = express()
http.createServer(app).listen(3000);
app.use(express.static(__dirname + "/client"));
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://0.0.0.0:27017/salon", { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('db connected...');
        })
        .catch(() => {
            console.log('bad connection...');
        });

app.get("/clients", ClientsController.index);
app.get("/clients/:id", ClientsController.show); 
app.post("/clients", ClientsController.create);
app.put("/clients/:id", ClientsController.update);
app.delete("/clients/:id", ClientsController.destroy);

app.get("/users/:username/clients", ClientsController.index);
app.post("/users/:username/clients", ClientsController.create);
app.put("/users/:username/clients/:id", ClientsController.update);
app.delete("/users/:username/clients/:id", ClientsController.destroy);

app.get("/users", UsersController.index); 
app.post("/users", UsersController.create); 
app.get("/users/:username", UsersController.show);
app.put("/users/:username", UsersController.update);
app.delete("/users/:username", UsersController.destroy);
