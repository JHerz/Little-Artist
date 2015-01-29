$(function() {
    var canvas = $("#canvas");
    context = canvas[0].getContext("2d");
    context.canvas.height = window.innerHeight;
    
    drawing = false;
    points = [];
    lines = [];
    redoLines = [];

   /* if (localStorage.pic) {
        lines = JSON.parse(localStorage.pic);
        $.each(lines, function(i, value) {
            context.beginPath();
            context.moveTo(value[0].x, value[0].y);
            $.each(value, function(k, val) {
                context.strokeStyle = value[0];
                context.lineWidth = value[1];
                context.lineTo(val.x, val.y);
                context.stroke();
            });
        });
    }*/

    $("#canvas").mousedown(
            function(event) {
                drawing = true;
                redoLines = [];
                context.beginPath();
                context.moveTo(event.offsetX, event.offsetY);
            }).mouseup(function() {
        drawing = false;
        lines.push(points);
      //  localStorage.pic = JSON.stringify(lines);
        points = [];
    });

    $("#canvas").mousemove(
            function(event) {
                if (drawing == true) {
                    context.lineTo(event.offsetX, event.offsetY);
                    context.stroke();
                    coordinates = {x: event.offsetX, y: event.offsetY};
                    //now each points array (each line) will store it's own color and thickness
                    //in the 1st and 2nd spot in the array:
                    points.push(context.strokeStyle);
                    points.push(context.lineWidth);
                    points.push(coordinates);
                }
            });

    function undo() {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        redoLines.push(lines.pop());
        $.each(lines, function(i, value) {
            context.beginPath();
            context.moveTo(value[0].x, value[0].y);
            $.each(value, function(k, val) {
                context.strokeStyle = value[0];
                context.lineWidth = value[1];
                context.lineTo(val.x, val.y);
                context.stroke();
            });
        });
   // localStorage.pic = JSON.stringify(lines);
    }

    function redo() {
        context.beginPath();
        context.moveTo(redoLines[redoLines.length - 1].x, redoLines[redoLines.length - 1].y);
        context.strokeStyle = redoLines[redoLines.length - 1][0];
        context.lineWidth = redoLines[redoLines.length - 1][1];
        $.each(redoLines[redoLines.length - 1], function(i, value) {
            context.lineTo(value.x, value.y);
        });
        context.stroke();
        lines.push(redoLines.pop());
      //  localStorage.pic = JSON.stringify(lines);
    }

    $("#undo").click(undo);
    $("#redo").click(redo);
    $("#clear").click(function() {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        points = [];
        lines = [];
        undo = [];
        redoLines = [];
      //  localStorage.pic="";
    });

    $("#green").click(function() {
        context.strokeStyle = "#1ACC10";
    });
    $("#yellow").click(function() {
        context.strokeStyle = "yellow";
    });
    $("#orange").click(function() {
        context.strokeStyle = "orange";
    });
    $("#blue").click(function() {
        context.strokeStyle = "#1375D6";
    });
    $("#red").click(function() {
        context.strokeStyle = "red";
    });
    $("#purple").click(function() {
        context.strokeStyle = "#B10CF2";
    });
    $("#pink").click(function() {
        context.strokeStyle = "hotpink";
    });
    $("#brown").click(function() {
        context.strokeStyle = "saddlebrown";
    });
// $("#black").click(function(){context.strokeStyle="black"});
    $('button').hover(function() {
        $(this).animate({color: "#FA8072",
            height: "5.2em",
            width: "5.2em",
            borderRadius: "36px"},
        100, "swing");
    }, function() {
        $(this).animate({
            borderRadius: "35px",
            height: "5em",
            width: "5em",
            color: "black"});
    }, 100, "swing");

    $("#thickness").click(function() {
        $(this).fadeToggle("fast", function() {
            $("<div id='thick'></div>").appendTo("#side").fadeIn("fast");
            $("#thick").slider({orientation: "vertical",
                range: "min",
                min: 0,
                max: 20,
                change: function(event, ui) {
                    switch (ui.value) {
                        case 0:
                            context.lineWidth = 4;
                            break;
                        case 1:
                            context.lineWidth = 6;
                            break;
                        case 2:
                            context.lineWidth = 9;
                            break;
                        case 3:
                            context.lineWidth = 12;
                            break;
                        case 4:
                            context.lineWidth = 16;
                            break;
                        case 5:
                            context.lineWidth = 20;
                            break;
                        case 6:
                            context.lineWidth = 24;
                            break;
                        case 7:
                            context.lineWidth = 28;
                            break;
                        case 8:
                            context.lineWidth = 32;
                            break;
                        case 9:
                            context.lineWidth = 36;
                            break;
                        case 10:
                            context.lineWidth = 40;
                            break;
                        case 11:
                            context.lineWidth = 44;
                            break;
                        case 12:
                            context.lineWidth = 48;
                            break;
                        case 13:
                            context.lineWidth = 52;
                            break;
                        case 14:
                            context.lineWidth = 56;
                            break;
                        case 15:
                            context.lineWidth = 61;
                            break;
                        case 16:
                            context.lineWidth = 66;
                            break;
                        case 17:
                            context.lineWidth = 72;
                            break;
                        case 18:
                            context.lineWidth = 80;
                            break;
                        case 19:
                            context.lineWidth = 90;
                            break;
                        case 20:
                            context.lineWidth = 100;
                            break;
                    }
                }
            });
        });
    });
});
