type animal = { id:number, name:string, age:number,type1:string }

 try{
   let updateAnimelArr:animal[]= updateArr(5)
   console.log(updateAnimelArr)
   console.log(returnAnimel(updateAnimelArr,"ant"))
   let addani:animal[]= addAnimal(updateAnimelArr, "ant")
   console.log(addani)
   let rem:animal[]= remove_id(addani, 5)
   console.log(rem)
   let rem_str:animal[]= remove_type(addani, "mouse")
   console.log(rem_str)
 }                        

catch(e:any)
{
    console.log(e.message)
}
// Upadte animel arr
function updateArr(size:number){

    if(size == 0)
        throw new Error("size cant be 0")
    else{
            
        let animalTypes:animal[]=[]
        for(let i = 0; i <size; i++){
            animalTypes[i]={ id:0, name:"juiu", age:1, type1:"hh"}
            //update id
            animalTypes[i].id=i
            let animel_type:number= Math.round(Math.random() * (5 - 1)) + 1
            if(animel_type==1)
                animalTypes[i].type1="fish"
            else if(animel_type==2)
                animalTypes[i].type1="dog"
            else if(animel_type==3)
                animalTypes[i].type1="mouse"
            else if(animel_type==4)
                animalTypes[i].type1="ant"
            else
                animalTypes[i].type1="cat"
            //update name
            let text = ""
            let len = Math.round(Math.random() * (5 - 3 )) + 3
            for(let i = 0; i < len; i++){
                let randomChar = Math.round(Math.random() * (122 - 97)) + 97
                text += String.fromCharCode(randomChar)
            }
            animalTypes[i].name=text
            //update age
            switch (animalTypes[i].type1) {
                case "fish":
                    animalTypes[i].age= Math.round(Math.random() * (5 - 2 )) + 2
                    break;
                case "dog":
                    animalTypes[i].age= Math.round(Math.random() * (16 - 8 )) + 8
                    break;
                case "mouse":
                    animalTypes[i].age= Math.round(Math.random() * (3 - 1 )) + 1
                    break;
                case "ant":
                    animalTypes[i].age= Math.round(Math.random() * (2 - 1 )) + 1
                    break;
                case "cat":
                    animalTypes[i].age= Math.round(Math.random() * (18 - 12 )) +12
                break;
            }
            
                
            
        }
    return animalTypes 
  }
}

// return one kind

function returnAnimel(animalTypes:animal[], animel:string ){
    if(animalTypes == null )
        throw new Error("array cant be null or empty")
    else if (animel=="")
    {
        throw new Error("animel can't be null")
    }
        else if (animel != "" )
                { 
                    let flug:number=1
                    for(let i=0 ; i<animalTypes.length;i++)
                    {
                      if(animel== animalTypes[i].type1)
                         flug=0
                    } 
                    if(flug==1)
                     throw new Error("Animel is not exsit");
                     
                
    
    let newArry:animal[] = []
        let index = 0
        for(let i = 0; i < animalTypes.length; i++){
            
            if(animalTypes[i].type1 == animel )
            {
                 newArry[index] =animalTypes[i]

                index++
            }  
        }
    

        return newArry
    }
    }

// add kind of animel

function addAnimal(arr:animal[], ani:string ){

let flug_ani:number=0
if(ani=="")
    throw new Error("animel is empty")
else{
   
 for(let i=0; i<arr.length;i++)
    if(ani ==arr[i].type1)
        flug_ani=1
if(flug_ani==0)   
        throw new Error("this type of animel is not in ARR animel")
else {
    arr[arr.length]={ id:5, name:"juiu", age:1, type1:"hh"}  
    arr[arr.length-1].id=arr.length-1
    arr[arr.length-1].type1=ani
    //update name
    let text = ""
    let len = Math.round(Math.random() * (5 - 3 )) + 3
         for(let i = 0; i < len; i++){
             let randomChar = Math.round(Math.random() * (122 - 97)) + 97
             text += String.fromCharCode(randomChar)
         }
    arr[arr.length-1].name=text
     //update age
    switch (arr[arr.length-1].type1) {
             case "fish":
                 arr[arr.length-1].age= Math.round(Math.random() * (5 - 2 )) + 2
                 break;
             case "dog":
                 arr[arr.length-1].age= Math.round(Math.random() * (16 - 8 )) + 8
                 break;
             case "mouse":
                 arr[arr.length-1].age= Math.round(Math.random() * (3 - 1 )) + 1
                 break;
             case "ant":
                 arr[arr.length-1].age= Math.round(Math.random() * (2 - 1 )) + 1
                 break;
             case "cat":
                 arr[arr.length].age= Math.round(Math.random() * (18 - 12 )) +12
             break;
     }


    return arr
    }

}

}
 
// remove animel with  id 

function remove_id (arr:animal[], index:number){

if(index>arr.length-1)
    throw new Error("id is big than arr length")
else if(index<0)
    throw new Error("id is little than 0")
else{
    let newArry:animal[]=[]
    let j=0
    for(let i=0; i<arr.length;i++)
    {
      
        if(arr[i].id!=index)
        {
            newArry[j]=arr[i]
            j++


        }
    }
   
return newArry

    }

}


// remove animel by type

function remove_type (arr:animal[], str:string){
    let newArry1:animal[]=[]
    let flug_type:number=1
    if(str =="")
       throw new Error("type is empty")
         else{
            for(let i=0; i<arr.length; i++)
                if(arr[i].type1===str)
                    flug_type=0
            
            if(flug_type==1)
                throw new Error("type is not exsits")
   
            else{
            
                let j=0
                for(let i=0; i<arr.length;i++)
                if(arr[i].type1!=str)
                    {
                        newArry1[j]=arr[i]
                        j++
                    }
        
            }
    return newArry1
        }
    
 }
