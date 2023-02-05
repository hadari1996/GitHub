console.log("connected");
import { cookieParser } from 'cookie-parser';


async function handleRegister(event) {
    try{
        event.preventDefault();
        
        const email= event.target.elements.email.value;
        const password= event.target.elements.password.value;
        const firstName= event.target.elements.firstName.value;
        const lastName= event.target.elements.lastName.value;
        const repeatPassword=event.target.elements.repeatPassword.value;
        if(!email||!password){
            throw new Error ("Password or email not exsits"); 
             document.querySelector(".error__message").innerHTML= "Password or email not exsits" ;
                }

        // @ts-ignore
        const {data}= await axios.post(`/api/v1/users/register`, {password, email, firstName, lastName, repeatPassword});
        console.log(data);
        window.location.href="./home.html";
        // if false , error message in div
        // if true , link to other page
    }
    catch(error){
        console.error(error);
        document.querySelector(".error__message").innerHTML=error.response.data.error;
    }
}

async function handleLogin(event) {

    try {
        event.preventDefault();
        const emailLogin= event.target.elements.loginEmail.value;
        const passwordLogin= event.target.elements.loginPassword.value;
        // @ts-ignore
        const {data}= await axios.post(`/api/v1/users/login` , {emailLogin, passwordLogin})
        const {login, userDB, error }= data;
        if(login){
            window.location.href="./home.html";
            const user=userDB.email;
            console.log(data);
        }
        else    
        window.location.href="./login.html";
    } catch (error) {
        console.error(error);
        document.querySelector(".error__message").innerHTML=error.response.data.error;
        
        
    }
    
}

async function handleUpdatePassword(event){
    try{
        event.preventDefault();
        const passwordToUpdate= event.target.elements.passwordToUpdate.value;
        const userId= event.target.elements.id.value
        if(!passwordToUpdate || !userId)
            throw new Error ("Password or email not exsits"); 
         //@ts-ignore 
        const {data}= await axios.patch(`/api/v1/users/updateID/${userId}`, {passwordToUpdate})
        window.location.href="./home.html";
        
    }   
    catch(error){
        console.log(error);
        document.querySelector(".error__message").innerHTML=error.response.data.error;
    }
}

async function getUserFromCookie(event){

    try{
        // @ts-ignore
        const {data}= await axios.get(`/api/v1/users/get-user-by-cookie`);
        console.log(data);
        const {login, userDB, userId}= data;
        if(!userId)  window.location.href="./login.html";
        const username= document.getElementById("username").innerHTML=`Hello ${userDB.email}`


    }
    catch(error){
        console.error(error)
    }
}

async function handleLogout() {
    try{
        //@ts-ignore 
        const {data}= await axios.get(`/api/v1/users/logout`);
        const {logout}= data;
        if(logout) window.location.href=("./login.html");
       }
    catch(error){
        console.log(error);
    }
}

async function handleCheckIfUserIsconnected() {
    try{
        // @ts-ignore
        const {data}= await axios.get(`/api/v1/users/get-user-by-cookie`)  
        const {userDB}= data;
        console.log(`this is ${userDB}`);
        if(userDB) window.location.href=("./home.html");
    }
    catch(error){
        console.error(error);
    }
}