
let count=-1;
function handeleAddImgP(){
 
    count++;
    getlen()

    async function getlen() {
        try{
            //@ts-ignore
            const {data}=await axios.get("/api/image/get-image-by-number")
            const {length}=data;
            getSrc(length)
        }
        catch(error){
            console.error(error)
        }
    }

    async function getSrc(length) {
        try{
            //@ts-ignore
            const {data}=await axios.post("/api/image/get-image-by-number", {count})
            const {img}=data;
            addImg(img, length);

        }
        catch(error){
            console.error(error)
        }
    }

    function addImg(img, length){
        let div=document.querySelector(".root") as HTMLElement;
        div.style.backgroundColor='rgba(41, 219, 219, 0.381)';
        let image=document.createElement("img")
        image.setAttribute("src", img);
        div.appendChild(image);
        if(count==length)
            count=0;

    }
}