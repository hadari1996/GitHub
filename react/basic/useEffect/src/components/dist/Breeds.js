"use strict";
exports.__esModule = true;
var Card_1 = require("./Card");
var Breeds = function (_a) {
    // const [listBreeds, setListBreeds]=  useState<string[]>([''])
    //     async function handleApiDogList(){
    //         try{
    var listBreeds = _a.listBreeds;
    //                 const { data } = await axios.get(`https://dog.ceo/api/breeds/list/all`);
    //                 const breeds: string[]= Object.keys(data.message);
    //                 // const {message}= data;
    //                 console.log(breeds);
    //                 setListBreeds(breeds);
    //             }
    //     catch(error){
    //         console.error(error);
    //     }
    // }
    //     useEffect(()=>{
    //         handleApiDogList();
    //         console.log("hello from useEffect")
    //     }, [])
    return (React.createElement("div", { className: "breeds" }, listBreeds.map(function (item, index) {
        return React.createElement(Card_1["default"], { key: index, src: item });
        // <img src={(item)} alt="" key={index}/>
    })));
};
exports["default"] = Breeds;
