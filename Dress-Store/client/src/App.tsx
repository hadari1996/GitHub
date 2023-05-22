import React from "react";
import logo from "./logo.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./views/Login";
import { store } from "./app/store";
import { Provider } from "react-redux";
import Register from "./views/Register";
import { DressesStore } from "./views/DressesStore";
import { Admin } from "./views/Admin";
import { AddDress } from "./components/AddDress";
import { UpdateDress } from "./components/UpdateDress";
import { DeleteDress } from "./components/DeleteDress";

function App() {
  return (
    <>
    <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dresses-store" element={<DressesStore/>} /> 
            <Route path="/admin" element={<Admin />} /> 
            <Route path="/admin/add-dress" element={<AddDress/>}/>
            <Route path="/admin/update-dress" element={<UpdateDress/>}/>
            <Route path="/admin/delete-dress" element={<DeleteDress/>}/>
          </Routes>
        </BrowserRouter>
        </Provider>

    </> 
  );
}

export default App;
