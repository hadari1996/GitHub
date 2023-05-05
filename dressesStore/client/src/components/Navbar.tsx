import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import Cart from './Cart'
import { Logout } from './Logout'


export const Navbar = () => {
    const [display, setDisplay] = useState("none")

    const handleSetDisplayCart = () => {
        if (display === "none") {
            setDisplay("block")
        } else if (display === "block") {
            setDisplay("none")
        }
    }

  return (
    <nav>
        <ul>
                <li>
                    <Link to={"/DressesStore"}>Store</Link>
                </li>
                <li>
                    <Link to={"/DressesStore"}>
                        Heart
                    </Link>
                </li>
            <li>
                <button onClick={handleSetDisplayCart}>Cart</button>
            </li>
            <li>
                <Logout/>
            </li>
        </ul>
        <Cart display={display}/>
    </nav>
  )
}
