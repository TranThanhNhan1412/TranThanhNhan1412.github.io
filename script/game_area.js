

var game_area_width = 600;
var game_area_height = 300;
var game_area = {
    score: 0,
    canvas: document.getElementById("game_area"),
    create: function () {
        this.canvas.width = game_area_width;
        this.canvas.height = game_area_height;
        this.context = this.canvas.getContext("2d");
        this.context.textAlign = 'center'
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.update_score(this.score);

    },
    clear_all_subcontext: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    show_stop_screen: function () {
        this.context.clearRect(game_area_width / 2, game_area_height / 2, 0, 0);
        this.context.font = "50px Arial";
        this.context.fillStyle = 'rgba(255, 5, 5, 1)';
        this.context.fillText("STOP!", game_area_width / 2, game_area_height / 2);
    },
    update_score: function () {
        this.context.fillStyle = '#abeeee';
        this.context.fillRect(0, 0, 100, 20);
        this.context.font = "15px Arial";
        this.context.fillStyle = 'rgba(255, 5, 5, 1)';
        this.context.fillText("Score: " + this.score, 30, 15);
    },
    show_dead_screen: function () {
        sound_die.play()
        this.clear_all_subcontext()
        this.context.fillStyle = 'rgba(255, 5, 5, 1)';
        this.context.font = "50px Arial";
        this.context.fillText("End: " + this.score, game_area_width / 2, game_area_height / 2);
        document.querySelectorAll('.controler_btn').forEach(elem => {
            elem.disabled = true;
        });
    }

}


