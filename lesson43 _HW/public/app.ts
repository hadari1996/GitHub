console.log("connected");
getUsers();
async function getUsers(){
try{
//@ts-ignore
const {data}= await axios.get(`/api/v1/users`);
const {users, successs } = data;  
const div_users=document.querySelector(".div_users");
displayUsers(users,div_users);
}

catch(error){
console.error(error)
}
}

const handleGetUsers= async (event)=>{
try{    
event.preventDefault();
const userid=event.target.elements.userid.value;
//@ts-ignore
const {data}= await axios.get(`/api/v1/users/${userid}`);
const {user, successs} = data;  
const users=[];
users[0]=user;
document.querySelector(".allUsers").innerHTML="";
const div_users=document.querySelector(".allUsers");
displayUsers(users,div_users);

}

catch(error){
    console.error(error)
    }
}

async function handleAddUseres(event) {
    try {
      event.preventDefault();
  
      const fName = event.target.elements.fname.value;
      const lName = event.target.elements.lname.value;
      const age = event.target.elements.age.value;
      const address = event.target.elements.address.value;
    // @ts-ignore
      const { data } = await axios.post("/api/v1/users", { fName, lName, age,address });
      console.log(data);;
      const {users}=data;
      const UpdateUsers=document.querySelector(".UpdateUsers");
      displayUsers(users,UpdateUsers );
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDeleteUseres(event) {
    try {
      event.preventDefault();
  
      const id = event.target.elements.del.value;
   
    // @ts-ignore
      const { data } = await axios.delete(`/api/v1/users/${id}`);
      console.log(data);
      const {userArray}=data;
      const UpdateUsers=document.querySelector(".deleteUsers");
      displayUsers(userArray, UpdateUsers);
    // const input =document.querySelector("#del") ;
        event.target.elements.del.value=""
    } catch (error) {
      console.error(error);
    }
  }

 function displayUsers(users, UpdateUsers){
UpdateUsers.innerHTML="";
const table = document.createElement("table");
const tHeader = document.createElement("th");
const td1 = document.createElement('td');
const td2 = document.createElement('td');
const td3 = document.createElement('td');
const td4 = document.createElement('td');
td1.textContent="First name";
td2.textContent="Last name";
td3.textContent="Age";
td4.textContent="Address";
tHeader.appendChild(td1);
tHeader.appendChild(td2);
tHeader.appendChild(td3);
tHeader.appendChild(td4);
table.appendChild(tHeader);

for(let i=0; i<users.length; i++){
const tr=document.createElement('tr');  
const td1=document.createElement('td');  
td1.textContent=users[i].f_name;
const td2=document.createElement('td');  
td2.textContent=users[i].l_name;
const td3=document.createElement('td');  
td3.textContent=users[i].age;
const td4=document.createElement('td');  
td4.textContent=users[i].address;
tr.appendChild(td1);
tr.appendChild(td2);
tr.appendChild(td3);
tr.appendChild(td4);
table.appendChild(tr);
}
UpdateUsers.appendChild(table);
}
