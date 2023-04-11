var main = function () {
    "use strict";
    var toDos = [
        "Посмотреть напитки",
        "Посмотреть завтраки",
        "Посмотреть ланчи",
        "Посмотреть акции"
    ];
    $(".tabs a span").toArray().forEach(function (element) {
        $(element).on("click", function () {
            $(".tabs a span").removeClass("active");
            $(element).addClass("active");
            $("main .content").empty();
            var $element = $(element), $content;
            if ($element.parent().is(":nth-child(1)")) {
                $content = $("<ul>");
                for (var i = toDos.length - 1; i > -1; i--) {
                    $content.append($("<li>").text(toDos[i]));
                }
                $("main .content").append($content);
            }
            else if ($element.parent().is(":nth-child(2)")) {
                $content = $("<ul>");
                toDos.forEach(function (todo) {
                    $content.append($("<li>").text(todo));
                });
                $("main .content").append($content);
            } else if ($element.parent().is(":nth-child(3)")) {
                $(".content").append("<input>");
                $(".content").append("<br />");
                $(".content").append("<button>Добавить</button>");
                $(".content input").addClass("inputStyle");
                $(".content br").addClass("clear");
                $(".content button").addClass("buttonStyle");
            }
            return false;
        });
    });
    $(".content").on("click", ".buttonStyle", function () {
        if ($(".inputStyle").val() != "") {
            toDos.push($(".inputStyle").val());
            alert("Предложение успешно добавлено в список!");
        }
        else {
            alert("ERROR: Длина добавляемого предложения должна быть > 0");
        }
    });
};
main();