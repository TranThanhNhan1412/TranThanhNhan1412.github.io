

var game_area_width = 500;
var game_area_height = 300;
var game_area = {
    canvas: document.getElementById("game_area"),
    start: function () {
        this.canvas.width = game_area_width;
        this.canvas.height = game_area_height;
        this.context = this.canvas.getContext("2d");
        this.context.textAlign = 'center'
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        // this.moving()
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    moving: function () {
        this.interval = setInterval(update_game_piece, 100);
    },
    stop: function () {
        this.context.clearRect(game_area_width / 2, game_area_height / 2, 0, 0);
        this.context.font = "50px Arial";
        this.context.fillText("STOP!", game_area_width / 2, game_area_height / 2);
        clearInterval(this.interval)
    },
    update_score: function (score = 0) {
        this.context.font = "15px Arial";
        this.fillStyle = 'rgba(255, 5, 5, 1)';
        this.context.fillText("Speed: " + score.toFixed(2), game_area_width - 100, 15);
    },
    dead: function (score) {
        this.clear()
        clearInterval(this.interval)
        this.fillStyle = 'rgba(255, 5, 5, 1)';
        this.context.font = "50px Arial";
        this.context.fillText("End: " + (score).toFixed(2), game_area_width / 2, game_area_height / 2);
        document.querySelectorAll('.controler_btn').forEach(elem => {
            elem.disabled = true;
        });
    }

}

function update_game_piece() {
    game_area.clear();
    piece.speed_x += 0.05;
    piece.speed_y += 0;
    piece.new_position();
    piece.update();
}

function piece_component(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed_x = 0;
    this.speed_y = 0;
    this.update = function () {
        ctx = game_area.context;
        ctx.fillStyle = `rgba(255, 5, 5, ${getRndInteger(5, 10) / 10})`;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        if (is_in_dead_zone(this.x, this.y)) {
            game_area.dead(this.speed_x);
        }
        else {
            game_area.update_score(piece.speed_x);
        }
    }
    this.new_position = function () {
        this.x += this.speed_x;
        this.y += this.speed_y;
    }

}
function is_in_dead_zone(x, y) {
    var flag = false
    var padding_area = piece_length + piece_x_init
    var dead_zone_x = [0, game_area_width - padding_area];
    var dead_zone_y = [padding_area, game_area_height - padding_area];
    if (x <= dead_zone_x[0] | x >= dead_zone_x[1]) {
        flag = true
    }
    if (y <= dead_zone_y[0] | y >= dead_zone_y[1]) {
        flag = true
    }
    return flag
};

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


