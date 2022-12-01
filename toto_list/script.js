
let block=document.querySelector(".block")
let cont=document.querySelector(".container")
let h1 = document.createElement("h1")
h1.textContent="ToDo List"
h1.classList.add("title")
cont.appendChild(h1)
let label= document.createElement("label")
label.textContent="task name:"
let input= document.createElement("input")
let form_task =document.createElement("form")
let sub =document.createElement("button")
input.classList.add("input")
sub.classList.add("sub")
sub.textContent="Add new"
form_task.classList.add("div-task")
form_task.appendChild(label)
form_task.appendChild(input)
form_task.appendChild(sub)
cont.appendChild(form_task)
block.appendChild(cont)
document.body.appendChild(block)
let list_div= document.createElement("div")
list_div.classList.add("list_div")
list_cont= document.querySelector(".container_list")
sub.addEventListener("click", addtask)


function addtask(e)
{
    e.preventDefault()
    let ul= document.createElement("ul")
    let text =input.value;
    console.log(text)
    if(input.value!="")
    {
    let icon=document.createElement("img")
    icon.setAttribute("src","./IMG-20221122-WA0121.jpg")
    icon.classList.add("icon")
    let li=document.createElement("li")
    li.textContent=input.value
    li.appendChild(icon)
    ul.appendChild(li);
    list_div.appendChild(ul)
    list_cont.appendChild(list_div)
    document.body.appendChild(list_cont);
    console.log(li.textContent)
    }
    else 
        alert ("task is required")
    input.value=""
    // remove task
    let btn_rem=document.querySelectorAll(".icon")
    for (let index = 0; index < btn_rem.length; index++) {
        let li_list=document.querySelectorAll("li")
        console.log("vfseadwsa")
        btn_rem[index].addEventListener("click", remove_task)

        function remove_task(){
             btn_rem[index].parentNode.remove();
        }
    

    }
 

}





