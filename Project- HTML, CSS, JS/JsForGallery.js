// Add picture to slider picture
let Newform= document.getElementById ("ADDForm")
Newform.addEventListener("submit" ,onsubmit)

function onsubmit(ev){
     ev.preventDefault()
      AddImg()
}   

function AddImg ()
{
    let SrcImg = document.getElementById("InputImg")
    let NewImg = document.createElement("img")
    
    NewImg.setAttribute("src",SrcImg.value)
    let NewSlider=document.getElementById("slider")
    NewSlider.appendChild(NewImg)
    let NewWrapper=document.getElementById("wrapper")
    NewWrapper.appendChild(NewSlider)
    SrcImg.value=""
    return NewImg

}


// for mobile/tablet screen - open navbar
// and when navbar is open , margin- bottom for image container
let MainMenu =document.getElementById("menu")
let ClickIcon =document.getElementById("icon_menu")
let NewCheck =document.getElementById("Check")
let NewContainer=document.querySelector(".container2")

ClickIcon.addEventListener("click" ,onclick)

let flag=0
let CheckFlag=0

function onclick(){
    if(CheckFlag==0)
    {
        NewCheck.checked=true
            if(NewCheck.checked===true){
                NewContainer.style.marginTop ="135px";
                menu.style.overflow="visible";
                NewCheck.checked=false
                flag=1   
                CheckFlag=1    
     }
    }

    else{
        menu.style.overflow="hidden";
        NewContainer.style.marginTop ="10px";
        CheckFlag=0
    }
}

let mediaQuery = window.matchMedia('(min-width: 800px)')

function handleTabletChange(e) {
  // Check if the media query is true
    if (e.matches) {
        NewContainer.style.marginTop ="10px";
    }
    else{
            if(flag=1){
            menu.style.overflow="hidden";
            flag=0
            }
    }
}

mediaQuery.addListener(handleTabletChange)
handleTabletChange(mediaQuery)
