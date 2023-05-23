let User = require("../models/user.js");
let Client = require("../models/client.js");
let ClientsController = {};

ClientsController.index = async function (req, res) {
	console.log("start ClientsController.index");
	
	let username = req.params.username || null;
	let respondWithClients;
	
	respondWithClients = async function (query) { 
		await Client.find(query)
			.then(async (toDos) => {
				res.status(200).json(toDos);
			})
			.catch(async (err) => {
				res.json(500, err);
			});
	};

	if (username !== null) {
		console.log("Поиск пользователя: " + username);

		await User.find({"username": username})
			.then(async data => {
				if (data.length === 0) {
					res.status(404).json({"result_length": 0});
				} else {
					respondWithClients({"owner": data[0]._id});
				}
			})
	} else {
		respondWithClients({});
	}
};

ClientsController.create = async function (req, res) {
	var username = req.params.username || null;
	var newClient = new Client({
		"description": req.body.description,
		"tags": req.body.tags
	});

	console.log("username: " + username);

	await User.find({"username": username})
		.then(async (result) => {
			if (result.length === 0) {
				newClient.owner = null;
			} else {
				newClient.owner = result[0]._id;
			}
			await newClient.save()
				.then(async (result) => {
					res.status(200).json(result);
				})
				.catch(async (err) => {
					console.log(err);
					res.json(500, err);
				});
		})
		.catch(async (err, result) => {
			res.send(500);
		});
};

ClientsController.show = async function (req, res) {
	var id = req.params.id;

	let userResultId;
	
	await User.find({"username":id})
		.then(async (result) => {
			userResultId = JSON.parse(JSON.stringify(result))[0]._id;
		})
		.catch(async (err) => {
			res.status(500).json(err);
		});

	await Client.find({"owner":userResultId})
		.then(async (client) => {
			res.status(200).json(client);

		})
		.catch(async (err) => {
			res.status(500).json(err);
		});
};

ClientsController.destroy = async function (req, res) {
	var id = req.params.id;

	await Client.deleteOne({"_id": id})
		.then(async (client) => {
			res.status(200).json(client);
		})
		.catch(async (err) => {
			res.status(500).json(err);
		});
}

ClientsController.update = async function (req, res) {
	var id = req.params.id;
	var newDescription = {$set: {description: req.body.description}};

	await Client.updateOne({"_id": id}, newDescription)
		.then(async (client) => {
			res.status(200).json(client);
		})
		.catch(async (err) => {
			res.status(500).json(err);
		});
}

module.exports = ClientsController;