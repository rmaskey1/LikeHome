import NavBar from "components/NavBar";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Details from "routes/Details";
import Home from "routes/Home";
import Login from "routes/Login";
import Register from "routes/Register";
import Profile from "routes/Profile";
import AddListing from "routes/AddListing";
import AccountMod from "routes/AccountMod";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/hotel/:id" element={<Details />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/add_listing" element={<AddListing />} />
        <Route path="/hotel/:id/modify_listing" element={<AddListing />} />
        <Route path="/account_modification" element={<AccountMod />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
