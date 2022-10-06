var piece;
var piece_length = 30;
var piece_x_init = 40;
var boost_speed = 50
function moving_piece() {
    piece.del_old_position();
    piece.speed_up(boost_speed/10);
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
        ctx = game_area.context;
        ctx.fillStyle = `rgba(255, 5, 5, ${getRndInteger(5, 10) / 10})`;
        ctx.fillRect(this.x, this.y, this.width, this.height);


    }
    this.del_old_position = function () {
        game_area.context.clearRect(this.x, this.y-this.height /2, this.width, this.height*2.5);

    }
    this.speed_up = function (speed = 0.05) {
        this.x += speed;
    }
}

function is_outside(x, y) {
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
