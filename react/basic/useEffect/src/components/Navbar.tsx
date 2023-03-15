import axios from "axios";
import { FC, useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";

interface NavbarProps {
  listBreeds: string[];
  setListBreeds: CallableFunction
}

const Navbar: FC<NavbarProps> = ({ listBreeds, setListBreeds }) => {
  const [srcItem, setsrcItem] = useState<string>("SRC");

  async function handleGetSrc() {
    try {
      const { data } = await axios.get(
        "https://dog.ceo/api/breeds/image/random"
      );
      console.log(data);
      const { message } = data;
      setsrcItem(message);
    } catch (error) {
      console.log(error);
    }
  }
  async function handleSearch(event: any) {
    try {
      const root = document.querySelector(".root")!;
      const searchString = event.target.value;
      const alt = event.target.value ;
      const newReg = new RegExp("^"+searchString)
      const newArray = listBreeds.filter((item) => newReg.test(item));

      setListBreeds(newArray)
      console.log(newArray)
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    console.log("on resource change");
    handleGetSrc();
  }, []);

  return (
    <div className="navbar">
      <Link to="/"><img src="https://cdn-icons-png.flaticon.com/512/616/616408.png" alt="" /></Link>
      <input
        type="text"
        placeholder="Search"
        onInput={(event) => {
          handleSearch(event);
        }}
      />
      <Outlet />
    </div>
  );
};
export default Navbar;
