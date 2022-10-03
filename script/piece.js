var piece;
var piece_length = 30;
var piece_x_init = 10;

function moving_piece(){
    game_area.clear_all_subcontext();
    // piece.speed_x += 0.05;
    // piece.speed_y += 0;
    piece.new_position();
    piece.update();
}


function Piece(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed_x = 0;
    this.speed_y = 0;
    this.moving = function () {
        this.interval = setInterval(moving_piece, 100);
    }
    this.update = function () {
        ctx = game_area.context;
        ctx.fillStyle = `rgba(255, 5, 5, ${getRndInteger(5, 10) / 10})`;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        if (is_in_dead_zone(this.x, this.y)) {
            clearInterval(piece.interval)
            game_area.show_dead_screen(this.speed_x);
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



//  --- Controler  ---

function stop_move() {
    piece.speed_x = 0;
    piece.speed_y = 0;
    clearInterval(piece.interval)
    game_area.show_stop_screen();
    document.querySelectorAll('.controler_btn').forEach(elem => {
        elem.disabled = true;
    });
    document.getElementById("continue_btn").disabled = false;

}

function restart() {
    piece = new Piece(piece_length, piece_length, piece_x_init, 120);
    document.querySelectorAll('.controler_btn').forEach(elem => {
        elem.disabled = false;
    });
    document.getElementById("start_btn").disabled = true;
    document.getElementById("continue_btn").disabled = true;
    piece.moving();

}

function continue_moving() {
    piece.moving();
}
function moveup() {
    piece.y -= piece_length / 2;
}
function movedown() {
    piece.y += piece_length / 2;
}
