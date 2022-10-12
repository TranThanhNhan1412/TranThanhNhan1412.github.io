var piece;
var piece_length = 30;
var piece_x_init = 40;
var gravity = 2;
function moving_piece() {
    piece.del_old_position();
    piece.falling(gravity);
    piece.update();
}


function Piece(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.moving = function () {
        this.interval = setInterval(moving_piece, 100);
    }
    this.update = function () {
        if (is_outside(piece.x, piece.y)) {
            this.die()
        } else {
            ctx = game_area.context;
            ctx.fillStyle = `rgba(255, 5, 5, ${getRndInteger(5, 10) / 10})`;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.del_old_position = function () {
        game_area.context.clearRect(this.x, this.y, this.width, this.height);
    }
    this.falling = function (gravity = 0.05) {
        this.y += gravity;
    }
    this.die = () => {
        clearInterval(piece.interval)
        clearInterval(create_obstacle_interval)
        stop_all_obstacle()
        game_area.show_dead_screen();

    }
}

function is_outside(x, y) {
    var flag = false
    var dead_zone_x = [0, game_area_width - (piece_length + piece_x_init)];
    var dead_zone_y = [piece_length, game_area_height - piece_length];
    if (x <= dead_zone_x[0] | x >= dead_zone_x[1]) {
        flag = true
    }
    if (y <= dead_zone_y[0] | y >= dead_zone_y[1]) {
        flag = true
    }
    return flag
};
