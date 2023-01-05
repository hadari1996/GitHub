var board = document.querySelector(".game-board");
var cardsArray = [
    { name: "bee", img: "bee-4059892__480.jpg" },
    { name: "butterflies", img: "butterflies-1127666_1280.jpg" },
    { name: "cat", img: "cat-6977088_1280.jpg" },
    { name: "female-lion", img: "female-lion-4156445__480.jpg" },
    { name: "ireland", img: "ireland-1971997__480.jpg" },
    { name: "kingfisher", img: "kingfisher-2046453__480.jpg" },
    { name: "maltese", img: "maltese-1123016__480.jpg" },
    { name: "peacock", img: "peacock-90051__480.jpg" },
    { name: "poppies", img: "poppies-174276__480.jpg" },
    { name: "rose", img: "rose-729509_1280.jpg" },
    { name: "spring-bird", img: "spring-bird-2295434__480.jpg" },
    { name: "zoo", img: "zoo-4423143__480.jpg" },
];
var counter_to_win = 0;
var gameGrid = cardsArray.concat(cardsArray);
gameGrid.sort(function () {
    return 0.5 - Math.random();
});
console.log(gameGrid);
var grid = document.createElement("section");
grid.classList.add("grid");
board === null || board === void 0 ? void 0 : board.appendChild(grid);
for (var i = 0; i < gameGrid.length; i++) {
    var card = document.createElement("div");
    card.classList.add("card");
    card.dataset.name = gameGrid[i].name;
    var front = document.createElement("div");
    front.classList.add("front");
    var back = document.createElement("div");
    back.classList.add("back");
    var img = document.createElement("img");
    img.setAttribute("src", gameGrid[i].img);
    back.appendChild(img);
    card.appendChild(front);
    card.appendChild(back);
    grid.appendChild(card);
}
start_game();
function start_game() {
    var count_cards_win = 0;
    var flag = 0;
    var cards1 = document.querySelectorAll(".front");
    for (var i = 0; i < cards1.length; i++) {
        var style = getComputedStyle(cards1[i]);
        if ((style.zIndex == "2" && (style.pointerEvents == "none")))
            count_cards_win++;
    }
    if (count_cards_win == 24)
        winner();
    var count_clicks = 0;
    var cards = document.querySelectorAll(".front");
    for (var i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", display_card);
    }
    function display_card(e) {
        //@ts-ignore
        e.target.style.zIndex = "0";
        count_clicks++;
        if (count_clicks == 2) {
            var non_click_cards = document.querySelectorAll(".front");
            for (var i = 0; i < non_click_cards.length; i++) {
                var style = getComputedStyle(non_click_cards[i]);
                non_click_cards[i].removeEventListener("click", display_card);
            }
            check_compare();
        }
    }
}
function check_compare() {
    var click_cards = document.querySelectorAll(".front");
    var j = 0;
    var arr = [];
    for (var i = 0; i < click_cards.length; i++) {
        var style = getComputedStyle(click_cards[i]);
        if (style.zIndex == "0") {
            arr[j] = gameGrid[i];
            j++;
        }
    }
    if (arr[0].name === arr[1].name) {
        counter_to_win++;
        console.log(counter_to_win);
        var backs_1 = document.querySelectorAll(".front");
        var _loop_1 = function (i) {
            if (gameGrid[i].name == arr[0].name) {
                setTimeout(function () {
                    // counter_to_win++;
                    // console.log(counter_to_win)
                    backs_1[i].style.zIndex = "2";
                    backs_1[i].classList.add("removed");
                    backs_1[i].style.background = "#d4d4e0";
                }, 1000);
            }
        };
        for (var i = 0; i < gameGrid.length; i++) {
            _loop_1(i);
        }
        setTimeout(function () {
            start_game();
        }, 1000);
    }
    else {
        var click_cards_1 = document.querySelectorAll(".front");
        var _loop_2 = function (i) {
            var style = getComputedStyle(click_cards_1[i]);
            if (style.zIndex == "0") {
                setTimeout(function () {
                    click_cards_1[i].style.zIndex = "2";
                }, 1000);
            }
        };
        for (var i = 0; i < click_cards_1.length; i++) {
            _loop_2(i);
        }
    }
    setTimeout(function () {
        start_game();
    }, 1000);
}
function getTimeRemaining(endtime) {
    // @ts-ignore
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    return {
        'minutes': minutes,
        'seconds': seconds
    };
}
function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');
    function updateClock() {
        var t = getTimeRemaining(endtime);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
        if (minutesSpan.innerHTML <= '00' && secondsSpan.innerHTML == '00' && counter_to_win != 2) {
            minutesSpan.innerHTML = '00';
            secondsSpan.innerHTML = '00';
            var label_over = document.createElement("label");
            var game_over = document.createElement("div");
            var reset = document.createElement("button");
            game_over.classList.add("game_over");
            label_over.textContent = "GAME OVER";
            reset.textContent = "reset";
            game_over.appendChild(label_over);
            game_over.appendChild(reset);
            board === null || board === void 0 ? void 0 : board.appendChild(game_over);
            var cards = document.querySelectorAll(".front");
            clock.remove();
            var res = document.querySelectorAll("button")[0];
            console.log(res);
            res.addEventListener("click", do_reset);
            function do_reset() {
                window.location.reload();
            }
        }
    }
    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
}
// @ts-ignore
var deadline = new Date(Date.parse(new Date()) + 5 * 60 * 1000);
initializeClock('clockdiv', deadline);
function winner() {
    var label_win = document.createElement("label");
    var game_win = document.createElement("div");
    game_win.classList.add("game_over");
    label_win.textContent = "YOU WIN!!!";
    game_win.appendChild(label_win);
    board.appendChild(game_win);
    setTimeout(function () {
        window.location.reload();
    }, 4000);
    var clockq = document.querySelector("#clockdiv");
    clockq.remove();
}
