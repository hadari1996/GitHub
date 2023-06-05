import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import Cart from "./Cart";
import { Logout } from "./Logout";
import "../style/navbar.scss";
import axios from "axios";
import { useAppSelector } from "../app/hooks";
import { userSelector } from "../features/user/userSlice";

<link
  href="https://fonts.googleapis.com/css2?family=Alkatra&display=swap"
  rel="stylesheet"
></link>;

interface NavBarProps {
  setDresses?: CallableFunction;
  componentRenderdBy: string;
}

export const Navbar: FC<NavBarProps> = ({ setDresses, componentRenderdBy }) => {
  const [display, setDisplay] = useState("none");
  const user = useAppSelector(userSelector);
  const handleSetDisplayCart = () => {
    if (display === "none") {
      setDisplay("block");
    } else if (display === "block") {
      setDisplay("none");
    }
  };

  const handleSearchDress = async (event: any) => {
    const dressName = event.target.value;
    if (dressName === "" || dressName === null || dressName === undefined) {
      const { data } = await axios.get(`/api/dresses/get-all-dresses`);
      const { dressesArr } = data;
      if (setDresses) {
        setDresses(dressesArr);
      }
    } else {
      const { data } = await axios.get(
        `/api/dresses/search-dress/${dressName}`
      );
      const ok = { data };
      if (!ok) throw new Error();
      const { dressesArr } = data;
      if (setDresses) {
        setDresses(dressesArr);
      }
    }
  };

  return (
    <>
      <nav className="navbar">
        <ul className="navbar__ul">
          <li className="navbar__ul__li">
            <Link to={"/dresses-store"} className="navbar__ul__li__a">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                className="icons-navbar"
              >
                <path d="M543.8 287.6c17 0 32-14 32-32.1c1-9-3-17-11-24L512 185V64c0-17.7-14.3-32-32-32H448c-17.7 0-32 14.3-32 32v36.7L309.5 7c-6-5-14-7-21-7s-15 1-22 8L10 231.5c-7 7-10 15-10 24c0 18 14 32.1 32 32.1h32v69.7c-.1 .9-.1 1.8-.1 2.8V472c0 22.1 17.9 40 40 40h16c1.2 0 2.4-.1 3.6-.2c1.5 .1 3 .2 4.5 .2H160h24c22.1 0 40-17.9 40-40V448 384c0-17.7 14.3-32 32-32h64c17.7 0 32 14.3 32 32v64 24c0 22.1 17.9 40 40 40h24 32.5c1.4 0 2.8 0 4.2-.1c1.1 .1 2.2 .1 3.3 .1h16c22.1 0 40-17.9 40-40V455.8c.3-2.6 .5-5.3 .5-8.1l-.7-160.2h32z" />
              </svg>
            </Link>
          </li>
          <li className="navbar__ul__li">
            <Link to={"/dresses-store"} className="navbar__ul__li__a">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="icons-navbar"
              >
                <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" />
              </svg>
            </Link>
          </li>

          <li className="navbar__ul__li">
            <svg
              onClick={handleSetDisplayCart}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              className="icons-navbar"
            >
              <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
            </svg>
          </li>

          {user?.role === 1 ? (
            <li className="navbar__ul__li">
              {" "}
              <Link to={"/admin/add-dress"} className="navbar__ul__li__a">
                Add dress
              </Link>
            </li>
          ) : null}

          {user?.role === 1 ? (
            <li className="navbar__ul__li">
              {" "}
              <Link to={"/admin/update-dress"} className="navbar__ul__li__a">
                Update dress
              </Link>
            </li>
          ) : null}

          {user?.role === 1 ? (
            <li className="navbar__ul__li">
              {" "}
              <Link to={"/admin/delete-dress"} className="navbar__ul__li__a">
                Delete dress
              </Link>
            </li>
          ) : null}
          <div className="navbar__ul__search">
            {componentRenderdBy === "STORE" ? (
              <input
                type="text"
                placeholder="Search your dress         "
                name="searchDress"
                onInput={(event) => handleSearchDress(event)}
                className="navbar__ul__search__input"
              />
            ) : null}
          </div>
          <div className="navbar__ul__logout">
            <li className="navbar__ul__li">
              <Logout />
            </li>
          </div>
        </ul>
      </nav>
      <Cart display={display} />
    </>
  );
};
