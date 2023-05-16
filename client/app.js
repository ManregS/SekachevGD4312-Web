var $content;

function loadBody() {
	$(document).ready(function () {
		$.getJSON("clients", function (toDoObjects) {
			main(toDoObjects);
		});
	});
}

function organizeByTagsOLD(toDoObjects) {
	var toDosDescription = toDoObjects.map(function (toDo) {
		return toDo.description;
	});

	var toDosTags = toDoObjects.map(function (toDo) {
		return toDo.tags;
	});

	var sTags = function(name, toDos) {
		this.name = name;
		this.toDos = toDos
	}

	var array = [];

	for (var i = 0; i < toDosDescription.length; i++) {
		var x = new sTags(toDosDescription[i], toDosTags[i]);
		array.push(x);
	}

	let json = JSON.stringify(array);
	json = JSON.parse(json);
	
	return json;
}

function organizeByTags(obj) {
	var newToDosDescription = obj.map(function (newToDo) {
		return newToDo.description;
	});

	var newToDosTags = obj.map(function (toDo) {
		return toDo.tags;
	});

	var newTags = function(name, toDos) {
		this.name = name;
		this.toDos = toDos;
	}

	var newArray = [];
	var arrayTags = [];
	var strTag = '';
	var array = [];

	for (var i = 0; i < newToDosTags.length; i++) {
		for (var j = 0; j < newToDosTags[i].length; j++) {
			if (arrayTags.indexOf(newToDosTags[i][j]) == -1) {
				arrayTags.push(newToDosTags[i][j]);
				strTag = newToDosTags[i][j];
				for (var k = 0; k < newToDosDescription.length; k++) {
					if (newToDosTags[k].indexOf(newToDosTags[i][j]) != -1) {
						newArray.push(newToDosDescription[k]);
					}
				}

				var x = new newTags(strTag, newArray);
				newArray = [];
				array.push(x);
			}
		}
	}

	let json = JSON.stringify(array);
	json = JSON.parse(json);

	return json;
}

var main = function (toDoObjects) {
	"use strict";
	
	var organizedByTagOLD = organizeByTagsOLD(toDoObjects);
	var organizedByTag = organizeByTags(toDoObjects);
	
	$(".tabs a span").toArray().forEach(function (element) {
		$(element).on("click", function () {
			$(".tabs a span").removeClass("active");
            $(element).addClass("active");
            $(".content").empty();
			var $element = $(element);
			$(".content").empty();
			if ($element.parent().is(":nth-child(1)")) {
				$content = $("<ul>");
				for (var i = organizedByTagOLD.length - 1; i > -1; i--) {
					$content.append($("<li>").text(organizedByTagOLD[i].name));
				}
				$(".content").append($content);
			} else if ($element.parent().is(":nth-child(2)")) {
				$content = $("<ul>");
				organizedByTagOLD.forEach(function (todo) {
					$content.append($("<li>").text(todo.name));
				});
				$(".content").append($content);
			} else if ($element.parent().is(":nth-child(3)")) {
				organizedByTag.forEach(function (tag) {
					var $tagName = $("<h3>").text(tag.name),
					$content = $("<ul>");
					tag.toDos.forEach(function (description) {
						var $li = $("<li>").text(description);
						$content.append($li);
					});
					$(".content").append($tagName);
					$(".content").append($content);
				});
			} else if ($element.parent().is(":nth-child(4)")) {
				$(".content").append("<p>");
				$(".content").append("<h3>Клиент: </h3>");
				$(".content").append("<input id='description'>");
				$(".content").append("<br>");
				$(".content").append("<p>");
				$(".content").append("<h3>Дата посещения: </h3>");
				$(".content").append("<input id='tags'>");
				$(".content").append("<p>");
				$(".content").append("<button>Добавить</button>");
				$(".content input").addClass("input");
				$(".content button").addClass("button");
			}
			
			return false;
		});
	});

	$(".content").on("click", ".button", function() {
		var newDescription = $("#description").val();
		var newTags = $("#tags").val().replace(/\s/g, "").split(',');

		var newRecord = {
			"description": newDescription,
			"tags": newTags
		}

		$.post("clients", newRecord, function (result) {
			toDoObjects.push(newRecord);
			alert("Предложение успешно добавлено в список!");
			
			organizedByTag = organizeByTags(toDoObjects);
			organizedByTagOLD = organizeByTagsOLD(toDoObjects);

			$("#description").val("");
			$("#tags").val("");
		});
	});
}