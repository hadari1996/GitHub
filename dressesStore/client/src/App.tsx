import React from "react";
import logo from "./logo.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./views/Login";
import { store } from "./app/store";
import { Provider } from "react-redux";
import Register from "./views/Register";
import { DressesStore } from "./views/DressesStore";

function App() {
  return (
    <>
    <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/DressesStore" element={<DressesStore />} /> 

          </Routes>
        </BrowserRouter>
        </Provider>

    </> 
  );
}

export default App;
