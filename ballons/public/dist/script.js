var background_music = document.querySelectorAll("audio")[1];
var life = document.createElement("label");
var score = document.createElement("label");
var prev = "classic";
background_music.loop = true;
var count_balloon = 0;
var count_loose = 3;
var score_points = 0;
var balloon = document.createElement("img");
var div_img = document.createElement("div");
var board_game = document.querySelector(".background");
balloon.setAttribute("src", "balloon.png");
div_img.appendChild(balloon);
board_game === null || board_game === void 0 ? void 0 : board_game.appendChild(div_img);
life.textContent = "life: " + count_loose;
score.textContent = "score: " + score_points;
life.classList.add("life");
score.classList.add("score");
var life_div = document.createElement("div");
var score_div = document.createElement("div");
score_div.appendChild(score);
life_div.appendChild(life);
life_div.classList.add("div_label");
score_div.classList.add("score_label");
board_game.appendChild(score_div);
board_game.appendChild(life_div);
var kind_balloon = "classic";
var id;
var sum_score_label = document.createElement("label");
var sum_score_div = document.createElement("div");
sum_score_label.textContent = "Your score " + score_points;
sum_score_div.appendChild(sum_score_label);
sum_score_div.classList.add("sum_score_div");
board_game.appendChild(sum_score_div);
sum_score_div.style.display = "none";
create_balloon(kind_balloon);
function create_balloon(kind_balloon) {
    var kind;
    background_music.play();
    if (kind_balloon == "black")
        balloon.setAttribute("src", "baloon_1.png");
    else
        balloon.setAttribute("src", "balloon.png");
    score.textContent = "score: " + score_points;
    life.textContent = "life: " + count_loose;
    var b_x_place = Math.round(Math.random() * 900) + 100;
    div_img.style.left = b_x_place + "px";
    div_img.classList.add("balloon");
    div_img.style.bottom = '-40px';
    clearInterval(id);
    id = setInterval(frame, 1);
    var pos = -40;
    function frame() {
        if (div_img.style.bottom == '600px') {
            count_balloon++;
            fly_tune.play();
            fly_tune.volume = 0.7;
            clearInterval(id);
            count_loose--;
            if (count_balloon % 9 == 0) {
                create_balloon("black");
            }
            else {
                create_balloon("classic");
            }
            console.log(count_loose);
            check_loss(count_loose);
        }
        else {
            pos++;
            div_img.style.bottom = pos + 'px';
        }
    }
    div_img.addEventListener("click", remove_balloon);
    return kind;
}
var tune = document.querySelectorAll("audio")[0];
var fly_tune = document.querySelectorAll("audio")[2];
function remove_balloon() {
    count_balloon++;
    if ((count_balloon == 10 || (count_balloon % 9 == 1)) && count_balloon != 1) {
        console.log(count_balloon);
        score_points += 50;
    }
    else {
        console.log(count_balloon);
        score_points += 10;
    }
    score.textContent = "score: " + score_points;
    tune.play();
    if (count_balloon % 9 == 0)
        prev = create_balloon("black");
    else
        prev = create_balloon("classic");
}
function check_loss(count_loose) {
    if (count_loose == 0) {
        fly_tune.pause();
        background_music.pause();
        score.textContent = "";
        life.textContent = "";
        var reset_btn = document.createElement("button");
        reset_btn.classList.add("reset_btn");
        reset_btn.textContent = "Game Over- reset";
        var link_btn = document.createElement("a");
        link_btn.appendChild(reset_btn);
        var board_game_1 = document.querySelector(".background");
        board_game_1.appendChild(link_btn);
        div_img.style.display = "none";
        score_div.style.display = "none";
        life.style.display = "none";
        score.textContent = "score:" + score_points;
        sum_score_div.style.display = "block";
        sum_score_label.textContent = "Your score " + score_points;
        score_points = 0;
        link_btn.addEventListener("click", reset_game);
    }
    else
        return null;
}
function reset_game(e) {
    background_music.currentTime = 0;
    background_music.play();
    count_loose = 3;
    score_points = 0;
    e.target.remove();
    count_loose = 3;
    div_img.style.display = "";
    life.style.display = "";
    score_div.style.display = "";
    sum_score_div.style.display = "none";
    prev = "classic";
    count_balloon = 0;
    score_points = 0;
    create_balloon("classic");
}
