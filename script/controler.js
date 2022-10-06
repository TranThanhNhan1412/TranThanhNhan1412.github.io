

//  --- Controler  ---

function stop_move() {
    clearInterval(piece.interval)
    stop_all_obstacle();
    game_area.show_stop_screen();

    document.querySelectorAll('.controler_btn').forEach(elem => {
        elem.disabled = true;
    });
    document.getElementById("continue_btn").disabled = false;
    clearInterval(create_obstacle_interval)

}
function restart() {
    location.reload();
}

function start() {
    piece = new Piece(piece_length, piece_length, piece_x_init, 120);
    document.querySelectorAll('.controler_btn').forEach(elem => {
        elem.disabled = false;
    });
    document.getElementById("continue_btn").disabled = true;
    piece.moving();

}

function continue_moving() {
    game_area.clear_all_subcontext()
    game_area.update_score()
    piece.moving();
    continue_obstacle();
    create_obstacle_interval = setInterval(create_obstacle, 1500);
    document.querySelectorAll('.controler_btn').forEach(elem => {
        elem.disabled = false;
    });
}
function moveup() {
    piece.y -= piece_length / 2;
}
function movedown() {
    piece.y += piece_length / 2;
}
