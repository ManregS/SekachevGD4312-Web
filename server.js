var express = require("express"),
    http = require("http"),
    app = express(),
    toDos = [];

app.use(express.static(__dirname + "/client"));
http.createServer(app).listen(3000);

app.get("/clients.json", function (req, res) {
    res.json(toDos);
});

app.use(express.static(__dirname + "/client"));

app.use(express.urlencoded({ extended: true }));
app.post("/clients", function (req, res) {
    var newRecord = req.body;
    console.log(newRecord);
    toDos.push(newRecord);

    res.json({
        "message": "Вы размещаетесь на сервере!"
    });
});

