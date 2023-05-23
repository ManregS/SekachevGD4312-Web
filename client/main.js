var main = function (UsersObjects) {
	"use strict";
	var $input = $("<input>"),
		$butLogin = $("<button>").text("Войти").addClass("button")

	$butLogin.on("click", function() {
		var username = $input.val();
		if (username !== null && username.trim() !== "") {
			var loginUser = {"username": username};
			$.ajaxSetup({ cache: false });
			$.ajax({
				'url': '/users/'+username,
				'type': 'GET'
			}).done(function(responde) {
				window.location.replace('users/' + username + '/');
			}).fail(function(jqXHR, textStatus, error) {
				console.log(error);
				alert("Произошла ошибка!\n"+jqXHR.status + " " + jqXHR.textStatus);	
			});
		}
	});

	$(".user").append($input);
    $(".user").append("<p>");
	$(".user").append($butLogin);
}

$(document).ready(function() {
	$.getJSON("users", function(UsersObjects) {
		main(UsersObjects);
	});
});