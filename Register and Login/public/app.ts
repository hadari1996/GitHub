console.log("connected");


async function handleRegister(event) {
    try{
        event.preventDefault();
        
        const email= event.target.elements.email.value;
        const password= event.target.elements.password.value;
        if(!email||!password){
            throw new Error ("Password or email not exsits"); 
             document.querySelector(".error__message").innerHTML= "Password or email not exsits" ;
                }

        // @ts-ignore
        const {data}= await axios.post(`/api/v1/users/register`, {password, email});
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
        const {ok, userDB, error}= data;
        if(ok){
            window.location.href="./home.html";
            const user=userDB.email;
            console.log(data);
        }
        else    
            alert("error!")
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