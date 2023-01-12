import express from "express";

const app= express();
const PORT=8002;

app.use(express.json());
app.use(express.static("public"));


const imges=["https://cdn.pixabay.com/photo/2022/05/12/15/00/dandelion-7191739__480.jpg",
"https://cdn.pixabay.com/photo/2022/10/22/13/42/durham-7539264_1280.jpg",
"https://cdn.pixabay.com/photo/2022/06/16/18/49/highland-cow-7266649_640.jpg",
"https://cdn.pixabay.com/photo/2023/01/05/12/01/horse-7698761__480.jpg",
"https://cdn.pixabay.com/photo/2022/12/29/20/07/winter-7685665_640.jpg",
"https://cdn.pixabay.com/photo/2022/09/28/13/17/pink-rose-7485056_640.jpg",
"https://cdn.pixabay.com/photo/2022/12/07/23/28/way-7642285__480.jpg",
"https://cdn.pixabay.com/photo/2023/01/01/15/34/vulture-7690279__480.jpg"]



app.get("/api/image/get-image-by-number", (req,res)=>{
    try{
     
        res.send({length:imges.length-1} )

    }
    catch{
        res.status(500).send({error:`error`});

    }
})


app.post("/api/image/get-image-by-number", (req,res)=>{
    try{
     
    //  res.send({length:imges.length} )
    const{count}=req.body 
    res.send({img:imges[count]});
    }
    catch{
        res.status(500).send({error:`error`});

    }
})

app.listen(PORT,()=>{
    console.log(`Port is active in  ${PORT}`);
})