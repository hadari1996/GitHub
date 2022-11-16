type cards_win = { win:boolean, index1:number, index2:number, index3:number }
let xSymbol = "X", oSymbol = "O";
let turn = true;

let btn = document.querySelectorAll('.btn')

for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", clickBtn)

}

function clickBtn(e: Event) {
    let flug_win:number=0
    let element = e.target! as HTMLElement
    if(element.textContent!="") return
    if (element.textContent == "") {
        if (turn == true) {
            element.style.color="#001eff"
            element.style.cursor="default"
            element.textContent = xSymbol
            let Cur_player =document.getElementsByClassName('Cur_player')[0]!
            Cur_player.textContent="Current turn: player "+oSymbol
            let checking=checkWin()
            if(checking.win){
                                    // console.log(checking.index1, checking.index2, checking.index3)
                                    let check_win=document.querySelectorAll(".btn")!
                                    let i1= check_win[checking.index1] as HTMLElement
                                    i1.textContent="WIN"
                                    i1.classList.add("o-x-win")
                                    let i2= check_win[checking.index2] as HTMLElement
                                    i2.textContent="WIN"
                                    i2.classList.add("o-x-win")
                                    let i3= check_win[checking.index3] as HTMLElement
                                    i3.textContent="WIN"
                                    i3.classList.add("o-x-win")
                setTimeout(()=>{

                    alert("ניצחת שחקן "+ xSymbol )   
                    if(reset() )
                        turn=true   
                }, 100)
                flug_win=1

            }
            turn=false

        }
        else {
            element.textContent = oSymbol
            element.style.color="rgb(84, 26, 83)"
            element.style.cursor="default"
            let Cur_player =document.getElementsByClassName('Cur_player')[0]!
            Cur_player.textContent="Current turn: player "+xSymbol
            let checking=checkWin()
            if(checking.win){
                let check_win:any=document.querySelectorAll(".btn")!
                let i1= check_win[checking.index1] as HTMLElement
                i1.textContent="WIN"
                i1.classList.add("o-x-win")
                let i2= check_win[checking.index2] as HTMLElement
                i2.textContent="WIN"
                i2.classList.add("o-x-win")
                let i3= check_win[checking.index3] as HTMLElement
                i3.textContent="WIN"
                i3.classList.add("o-x-win")
                setTimeout(()=>{
                     alert("ניצחת שחקן " + oSymbol)  
                    reset()    
                }, 100)
                flug_win=1
            }
            turn = true
        }
        

        
    }
    let check_full_cards= document.getElementsByClassName("btn")
    let count:number=0
    for(let i:number=0;i<check_full_cards.length;i++)
    {
        if(check_full_cards[i].textContent!="")
            count++
    }

    if(flug_win==0 && count==9 ) 
    setTimeout(()=>{

        alert("NO winner!")
        reset()
    },100)
}

function checkWin()
{
    let cards= document.querySelectorAll('.btn')!
   
  
        if(cards[0].textContent==cards[1].textContent&& (cards[1].textContent==cards[2].textContent)&&cards[0].textContent!="")
            {   
                let obj:cards_win={win:true, index1:0, index2:1, index3:2}
                return obj
            }
          else if (cards[0].textContent==cards[3].textContent&& (cards[3].textContent==cards[6].textContent)&&cards[0].textContent!="")
            {   
            let obj:cards_win={win:true, index1:0, index2:3, index3:6}
            return obj
            }
          else if (cards[0].textContent==cards[4].textContent&& (cards[4].textContent==cards[8].textContent)&&cards[0].textContent!="")
          {   
            let obj:cards_win={win:true, index1:0, index2:4, index3:8}
            return obj
            }
           else if(cards[3].textContent==btn[4].textContent&& (cards[4].textContent==cards[5].textContent)&&cards[3].textContent!="")
           {   
            let obj:cards_win={win:true, index1:3, index2:4, index3:5}
            return obj
            }
           else if (cards[3].textContent==btn[4].textContent&& (cards[4].textContent==cards[5].textContent)&&cards[6].textContent!="")
           {   
            let obj:cards_win={win:true, index1:3, index2:4, index3:5}
            return obj
            }
            else if(cards[6].textContent==cards[7].textContent&& (cards[7].textContent==cards[8].textContent)&&cards[6].textContent!="")
            {   
                let obj:cards_win={win:true, index1:6, index2:7, index3:8}
                return obj
            }
            else if(cards[6].textContent==cards[7].textContent&& (cards[7].textContent==cards[8].textContent)&&cards[6].textContent!="")
            {   
                let obj:cards_win={win:true, index1:6, index2:7, index3:8}
                return obj
            }
            else if(cards[2].textContent==cards[4].textContent&& (cards[4].textContent==cards[6].textContent)&&cards[6].textContent!="")
            {   
                let obj:cards_win={win:true, index1:2, index2:4, index3:6}
                return obj
            }
            else if(cards[1].textContent==cards[4].textContent&& (cards[4].textContent==cards[7].textContent)&&cards[4].textContent!="")
            {   
                let obj:cards_win={win:true, index1:1, index2:4, index3:7}
                return obj
            }
            else if(cards[2].textContent==cards[5].textContent&& (cards[5].textContent==cards[8].textContent)&&cards[5].textContent!="")
            {   
                let obj:cards_win={win:true, index1:2, index2:5, index3:8}
                return obj
            }
            else{
               
                    let obj:cards_win={win:false, index1:0, index2:0, index3:0}
                    return obj
               }
         
            }



let b_reset = document.getElementsByClassName("reset_btn")[0]!
b_reset.addEventListener('click', reset)

function reset(){

 let buttons=document.querySelectorAll('.btn')
 for(let i=0; i<btn.length; i++)
    btn[i].textContent=""
 let turn=document.getElementsByClassName('Cur_player')[0]!
 turn.textContent=""
 let reset = true
 return reset
}