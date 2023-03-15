import Card from "./components/Card";
import "./App.scss";
import Container from "./components/Container";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import BreedCard from "./components/BreedCard";
import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Page404 from "./views/Page404";
// import "/App.scss";
// import Navbar from './components/Navbar';
function App() {
  const [listBreeds, setListBreeds] = useState<string[]>([""]);
  const [renderlistBreeds, setRenderListBreeds] = useState<string[]>([""]);
  async function handleApiDogList() {
    try {
      const { data } = await axios.get(`https://dog.ceo/api/breeds/list/all`);
      const breeds: string[] = Object.keys(data.message);
      console.log(breeds);
      
      setListBreeds(breeds);
      setRenderListBreeds(breeds)
      localStorage["breeds"] = (breeds);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    handleApiDogList();
    console.log("hello from useEffect");
  }, []);
  return (
    <BrowserRouter>
      <Routes>
      <Route path="*" element={<Page404 />} />
        <Route path="/" element={<Navbar listBreeds={listBreeds} setListBreeds={setRenderListBreeds}/>}>
          <Route index element={<Container listBreeds={renderlistBreeds}/>}/>
          <Route path="/breed/:breed" element={<BreedCard listBreeds={listBreeds}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
