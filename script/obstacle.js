const obstacle_color = "#4ed539";
const space_height = 100;
const space_2_obstacle = 120;
const obstacle_interval = {}
var num_obstacle = 0
var stop_create = false
var create_obstacle_interval = setInterval(create_obstacle, 3* 1000);

function create_obstacle() {
    let obstacle = new Obstacle(game_area_width, "obstacle " + num_obstacle.toString())
    obstacle.interval = setInterval(moving_obstacle, 500, obstacle);
    obstacle_interval[num_obstacle] = obstacle
    num_obstacle += 1
}
function moving_obstacle(obstacle) {
    obstacle.del_old_position();
    game_area.update_score(game_area.score);
    obstacle.move_right(30);
    obstacle.update();
}

function stop_all_obstacle() {
    for (const ind in obstacle_interval) {
        clearInterval(obstacle_interval[ind].interval);
    }
}

function continue_obstacle() {
    for (const ind in obstacle_interval) {
        obstacle_interval[ind].interval = setInterval(moving_obstacle, 500, obstacle_interval[ind]);
    }
}

function Obstacle(start_x = game_area_width, name = '') {
    this.width = 10;
    this.height_upper = getRndInteger(50, 150)
    this.height_lower = game_area_height - this.height_upper - space_height
    this.x = start_x;
    this.name = name;
    this.y_upper = 0;
    this.y_lower = game_area_height - this.height_lower;
    this.is_over = false
    this.update = function () {
        ctx = game_area.context;
        ctx.fillStyle = obstacle_color;
        if (this.is_over == false & this.x <= piece.x + piece.width) {
            if (is_outside(piece.x, piece.y) | is_conflict(this)) {
                stop_create = true
                clearInterval(piece.interval)
                stop_all_obstacle()
                clearInterval(create_obstacle_interval)
                this.is_over == 1
                game_area.show_dead_screen();
            }
            else {
                game_area.score += 1
                this.is_over = true
            }
        }

        if (this.x <= game_area_width) {
            ctx.fillRect(this.x, this.y_upper, this.width, this.height_upper);
            ctx.fillRect(this.x, this.y_lower, this.width, this.height_lower);
        }
        if (this.x <= game_area_width - space_2_obstacle) {
            this.has_next = true

        }
    }
    this.del_old_position = function () {
        game_area.context.clearRect(this.x, this.y_upper, this.width, this.height_upper);
        game_area.context.clearRect(this.x, this.y_lower, this.width, this.height_lower);

    }
    this.move_right = function (move_width = 10) {
        this.x -= move_width;
    }
}


function is_conflict(obstacle) {
    var flag = false
    var is_upper_conflict = Boolean(piece.y <= obstacle.height_upper)
    var is_lower_conflict = Boolean(piece.y-piece.width >= obstacle.y_lower)
    if (is_upper_conflict | is_lower_conflict) {
        flag = true
    }
    return flag
}