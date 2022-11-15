try {
    var updateAnimelArr = updateArr(5);
    console.log(updateAnimelArr);
    console.log(returnAnimel(updateAnimelArr, "ant"));
    var addani = addAnimal(updateAnimelArr, "ant");
    console.log(addani);
    var rem = remove_id(addani, 5);
    console.log(rem);
    var rem_str = remove_type(addani, "mouse");
    console.log(rem_str);
}
catch (e) {
    console.log(e.message);
}
// Upadte animel arr
function updateArr(size) {
    if (size == 0)
        throw new Error("size cant be 0");
    else {
        var animalTypes = [];
        for (var i = 0; i < size; i++) {
            animalTypes[i] = { id: 0, name: "juiu", age: 1, type1: "hh" };
            //update id
            animalTypes[i].id = i;
            var animel_type = Math.round(Math.random() * (5 - 1)) + 1;
            if (animel_type == 1)
                animalTypes[i].type1 = "fish";
            else if (animel_type == 2)
                animalTypes[i].type1 = "dog";
            else if (animel_type == 3)
                animalTypes[i].type1 = "mouse";
            else if (animel_type == 4)
                animalTypes[i].type1 = "ant";
            else
                animalTypes[i].type1 = "cat";
            //update name
            var text = "";
            var len = Math.round(Math.random() * (5 - 3)) + 3;
            for (var i_1 = 0; i_1 < len; i_1++) {
                var randomChar = Math.round(Math.random() * (122 - 97)) + 97;
                text += String.fromCharCode(randomChar);
            }
            animalTypes[i].name = text;
            //update age
            switch (animalTypes[i].type1) {
                case "fish":
                    animalTypes[i].age = Math.round(Math.random() * (5 - 2)) + 2;
                    break;
                case "dog":
                    animalTypes[i].age = Math.round(Math.random() * (16 - 8)) + 8;
                    break;
                case "mouse":
                    animalTypes[i].age = Math.round(Math.random() * (3 - 1)) + 1;
                    break;
                case "ant":
                    animalTypes[i].age = Math.round(Math.random() * (2 - 1)) + 1;
                    break;
                case "cat":
                    animalTypes[i].age = Math.round(Math.random() * (18 - 12)) + 12;
                    break;
            }
        }
        return animalTypes;
    }
}
// return one kind
function returnAnimel(animalTypes, animel) {
    if (animalTypes == null)
        throw new Error("array cant be null or empty");
    else if (animel == "") {
        throw new Error("animel can't be null");
    }
    else if (animel != "") {
        var flug = 1;
        for (var i = 0; i < animalTypes.length; i++) {
            if (animel == animalTypes[i].type1)
                flug = 0;
        }
        if (flug == 1)
            throw new Error("Animel is not exsit");
        var newArry = [];
        var index = 0;
        for (var i = 0; i < animalTypes.length; i++) {
            if (animalTypes[i].type1 == animel) {
                newArry[index] = animalTypes[i];
                index++;
            }
        }
        return newArry;
    }
}
// add kind of animel
function addAnimal(arr, ani) {
    var flug_ani = 0;
    if (ani == "")
        throw new Error("animel is empty");
    else {
        for (var i = 0; i < arr.length; i++)
            if (ani == arr[i].type1)
                flug_ani = 1;
        if (flug_ani == 0)
            throw new Error("this type of animel is not in ARR animel");
        else {
            arr[arr.length] = { id: 5, name: "juiu", age: 1, type1: "hh" };
            arr[arr.length - 1].id = arr.length - 1;
            arr[arr.length - 1].type1 = ani;
            //update name
            var text = "";
            var len = Math.round(Math.random() * (5 - 3)) + 3;
            for (var i = 0; i < len; i++) {
                var randomChar = Math.round(Math.random() * (122 - 97)) + 97;
                text += String.fromCharCode(randomChar);
            }
            arr[arr.length - 1].name = text;
            //update age
            switch (arr[arr.length - 1].type1) {
                case "fish":
                    arr[arr.length - 1].age = Math.round(Math.random() * (5 - 2)) + 2;
                    break;
                case "dog":
                    arr[arr.length - 1].age = Math.round(Math.random() * (16 - 8)) + 8;
                    break;
                case "mouse":
                    arr[arr.length - 1].age = Math.round(Math.random() * (3 - 1)) + 1;
                    break;
                case "ant":
                    arr[arr.length - 1].age = Math.round(Math.random() * (2 - 1)) + 1;
                    break;
                case "cat":
                    arr[arr.length].age = Math.round(Math.random() * (18 - 12)) + 12;
                    break;
            }
            return arr;
        }
    }
}
// remove animel with  id 
function remove_id(arr, index) {
    if (index > arr.length - 1)
        throw new Error("id is big than arr length");
    else if (index < 0)
        throw new Error("id is little than 0");
    else {
        var newArry = [];
        var j = 0;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].id != index) {
                newArry[j] = arr[i];
                j++;
            }
        }
        return newArry;
    }
}
// remove animel by type
function remove_type(arr, str) {
    var newArry1 = [];
    var flug_type = 1;
    if (str == "")
        throw new Error("type is empty");
    else {
        for (var i = 0; i < arr.length; i++)
            if (arr[i].type1 === str)
                flug_type = 0;
        if (flug_type == 1)
            throw new Error("type is not exsits");
        else {
            var j = 0;
            for (var i = 0; i < arr.length; i++)
                if (arr[i].type1 != str) {
                    newArry1[j] = arr[i];
                    j++;
                }
        }
        return newArry1;
    }
}
