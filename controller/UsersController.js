let User = require("../models/user.js");
let Client = require("../models/client.js");
let UsersController = {};

UsersController.index = async function (req, res) {
	console.log("start UsersController.index");

	await User.find()
            .then(async (users) => {
                res.status(200).json(users);
            })
            .catch(async (err) => {
                res.json(500, err);
            });
};

UsersController.show = async function (req, res) {
	console.log("start UsersController.show");
	await User.find({'username' : req.params.username})
			.then(async (result) => {
				if (result.length !== 0) {
					res.sendfile('./client/app.html');
				} else {
					res.send(404);
				}
			})
			.catch(async (err) => {
				console.log(err);
			});
};

UsersController.create = async function (req, res) {
	console.log("start UsersController.create");
	var username = req.body.username;
	
	await User.find({"username": username})
            .then(async (result) => {
                if (result.length !== 0) {
                    res.status(501).send("Пользователь уже существует");
                    console.log("Пользователь уже существует"); 
                } else {
                    var newUser = new User({
                            "username": username
                        });
                    
                    await newUser.save()
                            .then(async (result) => {
                                res.json(200, result);
                                        console.log(result);
                            })
                            .catch(async (err) => {
                                res.json(500, err);
                            });
                }
            })
            .catch(async (err, result) => {
                console.log(err);
            });
};

UsersController.update = async function (req, res) {
	console.log("start UsersController.update");
	var username = req.params.username;
	
	var newUsername = {$set: {username: req.body.username}};

	await User.updateOne({"username": username}, newUsername)
			.then(async (user) => {
				console.log("Старое имя пользователя: " + username);
				console.log("Новое имя пользователя: " + req.body.username);
				
				res.status(200).json(user);
			})
			.catch(async (err) => {
				res.status(500).json(err);
			});
};

UsersController.destroy = async function (req, res) {
	console.log("start UsersController.destroy");
	var username = req.params.username;

	await User.find({"username": username})
		.then(async (result) => {
			if (result.length !== 0) {
				console.log("Удаляем все client с 'owner': " + result[0]._id);
				await Client.deleteMany({"owner": result[0]._id})
					.then(async (err, todo) => {
						console.log("Удаляем пользователя " + username);
						await User.deleteOne({"username": username})
							.then(async (result) => {
								if (user.n === 1 && user.ok === 1 && user.deletedCount === 1) {
									res.status(200).json(user);
								} else {
									res.status(404).json({"status": 404});
								}
							})
							.catch(async (err) => {
								res.status(200).json(err);
							});
					})
					.catch();
			} else {
				res.status(404).send("Пользователь не существует");
            	console.log(err);
			}
		})
		.catch(async (err, result) => {
			console.log(err);
            res.send(500, err);
		});
};

module.exports = UsersController;