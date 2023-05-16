var express = require("express"),
    http = require("http"),
    app = express(),
    clients = [
        {
            "description": "Секачев Г.Д.",
            "tags": [
                "10.04.2023",
                "15.04.2023"
            ]
        },
        {
            "description": "Галиев И.Р.",
            "tags": [
                "02.05.2023"
            ]
        },
        {
            "description": "Ямалтдинова Н.Ф.",
            "tags": [
                "02.04.2023",
                "03.05.2023"
            ]
        },
        {
            "description": "Анисов А.С.",
            "tags": [
                "23.04.2023"
            ]
        }
    ];

app.use(express.static(__dirname + "/client"));
http.createServer(app).listen(3000);

app.get("/clients", function (req, res) {
    res.json(clients);
});

app.use(express.urlencoded({ extended: true }));
app.post("/clients", function (req, res) {
    var newRecord = req.body;
    console.log(newRecord);
    clients.push(newRecord);

    res.json({ "message": "Вы размещаетесь на сервере!" });
});

