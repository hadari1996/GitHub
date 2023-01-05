interface Card {
  name: string;
  img: string;
}

let board = document.querySelector(".game-board");
let cardsArray: Card[] = [
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
let counter_to_win =0;
let gameGrid = cardsArray.concat(cardsArray);
gameGrid.sort(function () {
  return 0.5 - Math.random();
});
console.log(gameGrid);
let grid = document.createElement("section");
grid.classList.add("grid");
board?.appendChild(grid);

for (let i = 0; i < gameGrid.length; i++) {
  let card = document.createElement("div");
  card.classList.add("card");
  card.dataset.name = gameGrid[i].name;
  let front = document.createElement("div");
  front.classList.add("front");
  let back = document.createElement("div");
  back.classList.add("back");
  let img = document.createElement("img");
  img.setAttribute("src", gameGrid[i].img);
  back.appendChild(img);
  card.appendChild(front);
  card.appendChild(back);
  grid.appendChild(card);
}
start_game();
function start_game() {

    let count_cards_win=0;
    let flag=0
let cards1 = document.querySelectorAll(".front");
for(let i=0; i<cards1.length; i++)
{
  let style =getComputedStyle(cards1[i]);
  if((style.zIndex == "2" && (style.pointerEvents =="none")))
    count_cards_win++

}
if(count_cards_win==24)
    winner();
  let count_clicks = 0;
  let cards = document.querySelectorAll(".front");

  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", display_card);
  }

  function display_card(e: Event) {
    //@ts-ignore
    e.target.style.zIndex="0";
    count_clicks++;
    if (count_clicks == 2) {
      let non_click_cards = document.querySelectorAll(".front")!;
      for (let i = 0; i < non_click_cards.length; i++) {
        let style = getComputedStyle(non_click_cards[i]);
          non_click_cards[i].removeEventListener("click", display_card);
      }
      check_compare();
    }
  }
}

function check_compare() {  
  let click_cards = document.querySelectorAll(".front")!;
  let j = 0;
  let arr: Card[] = [];
  for (let i = 0; i < click_cards.length; i++) {
    let style = getComputedStyle(click_cards[i]);
    if (style.zIndex == "0") {
        arr[j] = gameGrid[i];
      j++;
    }
  }
  if (arr[0].name ===arr[1].name) {
    counter_to_win++;
    console.log( counter_to_win)
    let backs = document.querySelectorAll(".front")!;
    for (let i = 0; i <gameGrid.length; i++) {
      if (gameGrid[i].name == arr[0].name) {
           
 
        setTimeout(() => {
            // counter_to_win++;
            // console.log(counter_to_win)
           
            backs[i].style.zIndex = "2";
            backs[i].classList.add("removed");
     
            backs[i].style.background = "#d4d4e0";
        }, 1000);
      }
    
    }
  
    setTimeout(() => {
        start_game();
    }, 1000);
}

   else
   {
    let click_cards = document.querySelectorAll(".front")!;
    for (let i = 0; i < click_cards.length; i++) {
      let style = getComputedStyle(click_cards[i]);
      if (style.zIndex == "0") {
        setTimeout(() => {
   
            click_cards[i].style.zIndex = "2";
          
          }, 1000);
      }

  }


    }
    setTimeout(() => {
    start_game();
}, 1000);

}


function getTimeRemaining(endtime) {
  // @ts-ignore
    let t = Date.parse(endtime) - Date.parse(new Date());
    let seconds = Math.floor((t / 1000) % 60);
    let minutes = Math.floor((t / 1000 / 60) % 60);
    return {
      'minutes': minutes,
      'seconds': seconds
    };
  }


  function initializeClock(id, endtime) {
    let clock = document.getElementById(id)!;
    let minutesSpan = clock.querySelector('.minutes')!;
    let secondsSpan = clock.querySelector('.seconds')!;
    function updateClock() {
      let t = getTimeRemaining(endtime);
      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
      if(minutesSpan.innerHTML<='00' && secondsSpan.innerHTML=='00' && counter_to_win!=2){
        minutesSpan.innerHTML = '00' ;
            secondsSpan.innerHTML = '00' ;
            let label_over=document.createElement("label")!;
            let game_over = document.createElement("div")!;
            let reset = document.createElement("button")!;
            game_over.classList.add("game_over");
            label_over.textContent="GAME OVER";
            reset.textContent="reset";
            game_over.appendChild(label_over);
            game_over.appendChild(reset);
            board?.appendChild(game_over);
            let cards = document.querySelectorAll(".front")!;
            clock.remove();
            let res =document.querySelectorAll("button")[0]!
  

            console.log(res);
            res.addEventListener("click", do_reset)
            function do_reset(){

                window.location.reload();
            }
      }


    }

    

        updateClock();
    let timeinterval = setInterval(updateClock, 1000)

  } 
  // @ts-ignore
  let deadline = new Date(Date.parse(new Date()) + 5 * 60 * 1000);
  initializeClock('clockdiv', deadline);


  function winner(){
    let label_win=document.createElement("label")!;
    let game_win = document.createElement("div")!;
    game_win.classList.add("game_over");
    label_win.textContent="YOU WIN!!!";
    game_win.appendChild(label_win);
    board!.appendChild(game_win);
    setTimeout(() => {
        window.location.reload();
      }, 4000);
     
        let clockq = document.querySelector("#clockdiv")!;
          clockq.remove();

}




  

