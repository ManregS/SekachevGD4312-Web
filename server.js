const express = require("express");
const http = require("http"); 
const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var app = express()
http.createServer(app).listen(3000);
app.use(express.static(__dirname + "/client"));
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://0.0.0.0:27017/salon8", { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('db connected...');
        })
        .catch(() => {
            console.log('bad connection...');
        });

var Client = mongoose.model("Client", new Schema({
    description: String,
    tags: [ String ]
}));

app.get("/clients", async (req, res) => {
    await Client.find()
                .then(async (Clients) => {
					res.json(Clients);
				})
				.catch((err) => {
					console.log(err);
				});
});

app.post("/clients", async (req, res) => {
	console.log(req.body);
	let newClient = new Client({
        "description": req.body.description, 
        "tags": req.body.tags
    });
	
	await newClient.save()
                   .then(async (result) => {
                       await Client.find()
                           .then(async (result) => {
                               res.json(result);
                           })
                           .catch(async (err) => {
                               res.send(err);
                           });
                   })
                   .catch(async (err) => {
                       console.log(err);
                       res.send("ERROR");
                   });
});
