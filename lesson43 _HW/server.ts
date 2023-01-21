

import express  from "express";
const app=express();

const PORT=8009;

app.use(express.json());
app.use(express.static('public'));
interface User {
    id: number | string;
    f_name: string;
    l_name: string;
    age: number;
    address: string;

  }
  

const users: User[] = [
    {
      id: 0,
      f_name: "Hadar",
      l_name: "Israeli",
      age: 26,
      address: "Rishon Lezion",
    },
  
    {
      id: 1,
      f_name: "Miryam",
      l_name: "Levi",
      age: 27,
      address: "Holon",
    },
  
    {
      id: 2,
      f_name: "Liat",
      l_name: "shir",
      age: 30,
      address: "Holon",
    },
  
    {
      id: 3,
      f_name: "Ishai",
      l_name: "Hacham",
      age: 30,
      address: "Jerusalem",
    },
  
    {
      id: 4,
      f_name: "David",
      l_name: "Hazan",
      age: 23,
      address: "Ramat Gan",
    },
  
    {
      id: 5,
      f_name: "Mor",
      l_name: "Yuval",
      age: 29,
      address: "Ashedod",
    },
  ];
  
app.get(`/api/v1/users`, (req,res)=>{
    try{

        res.send({ users:users, successs:true})

    }

    catch(error){
        res.status(500).send({successs:false, error});
        
    }
})


app.get(`/api/v1/users/:userid`, (req,res)=>{
  try{
    const {userid}= req.params;
    const user:User= users.find((element) =>element.id==userid)
      res.send({ user:user, successs:true})

  }

  catch(error){
      res.status(500).send({successs:false, error});
      
  }
})


app.post("/api/v1/users", (req, res) => {
  try {
    const { fName, lName, age, address } = req.body;
    users.push({ id: guid(), f_name:fName, l_name:lName, age:age, address:address });
    res.send({ success: true, users });
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
});


app.delete("/api/v1/users/:userid", (req, res) => {
  try {
    const { userid } = req.params;
   const userArray=users.filter((el) => el.id != userid);
    res.send({ success: true, userArray });
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
});

app.listen(PORT, ()=>{
    console.log(`server is active in port ${PORT}`)
})

let guid = () => {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  )};