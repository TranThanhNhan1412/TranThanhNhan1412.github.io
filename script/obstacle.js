var space_height = 100;
var space_2_obstacle = 120;
var list_obstacle = {}
var num_obstacle = 0
function create_obstacle() {
    let obstacle = new Obstacle(game_area_width+space_2_obstacle*num_obstacle, "obstacle " + num_obstacle.toString())
    obstacle.interval = setInterval(moving_obstacle, 500, obstacle);
}
function moving_obstacle(obstacle) {
    obstacle.del_old_position();

    game_area.update_score(game_area.score);
    obstacle.move_right(30);
    obstacle.update();
    if (obstacle.has_next & num_obstacle<3) {
        create_obstacle()
        num_obstacle += 1

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
    
    this.update = function () {
        ctx = game_area.context;
        ctx.fillStyle = "#4ed539";
        if (this.x < 140) {
            game_area.score += 1
            console.log(game_area.score)
            clearInterval(this.interval)
        }
        else if (this.x <= game_area_width) {
            ctx.fillRect(this.x, this.y_upper, this.width, this.height_upper);
            ctx.fillRect(this.x, this.y_lower, this.width, this.height_lower);
        }
        if (this.x <= game_area_width - space_2_obstacle) {
            this.has_next = true
        }
        // console.log(name,game_area_width,this.x )

    }
    this.del_old_position = function () {
        game_area.context.clearRect(this.x, this.y_upper, this.width, this.height_upper);
        game_area.context.clearRect(this.x, this.y_lower, this.width, this.height_lower);

    }
    this.move_right = function (move_width = 10) {
        this.x -= move_width;
    }
}