var main = function () {
    "use strict";
    var toDos = [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Duis et ligula laoreet tortor pharetra accumsan.",
        "Sed blandit libero a dictum imperdiet.",
        "Etiam eget ligula sed libero dapibus consectetur."
    ];
    $(".tabs a span").toArray().forEach(function (element) {
        $(element).on("click", function () {
            var $element = $(element), $content;
            $(".tabs a span").removeClass("active");
            $element.addClass("active");
            $(".content").empty();
            if ($element.parent().is(":nth-child(1)")) {
                $content = $("<ul>");
				for (var i = toDos.length - 1; i > -1; i--) {
					$content.append($("<li>").text(toDos[i]));
				}
				$(".content").append($content);
            } else if ($element.parent().is(":nth-child(2)")) {
                $content = $("<ul>");
                toDos.forEach(function (todo) {
                    $content.append($("<li>").text(todo));
                });
                $(".content").append($content);
            } else if ($element.parent().is(":nth-child(3)")) {
                $(".content").append("<p>");
                $(".content").append("<input>");
                $(".content").append("<br>");
                $(".content").append("<p>");
				$(".content").append("<button>Добавить</button>");
				$(".content input").addClass("input");
				$(".content button").addClass("button");
            }
            return false;
        })
    });
    $(".content").on("click", ".button", function() {
		if ($(".input").val() != "") {
			toDos.push($(".input").val());
			alert("Предложение успешно добавлено в список!");
		}
		else {
			alert("ERROR: Длина добавляемого предложения должна быть > 0");
		}
	});
};

main();