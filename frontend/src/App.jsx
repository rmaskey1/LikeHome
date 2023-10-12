import NavBar from "components/NavBar";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Details from "routes/Details";
import Landing from "routes/Landing";
import Login from "routes/Login";
import NotFound from "routes/NotFound";
import Profile from "routes/Profile";
import Register from "routes/Register";
import AddListing from "routes/AddListing";
import ModifyListing from "routes/ModifyListing";
import AccountMod from "routes/AccountMod";
import RegisterHotel from "routes/RegisterHotel";
import PreviewCardsListing from "routes/PreviewCardsListing";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/hotel" element={<RegisterHotel />} />
        <Route path="/hotel/:id" element={<Details />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/add_listing" element={<AddListing />} />
        <Route path="/hotel/:id/modify_listing" element={<ModifyListing />} />
        <Route path="/account_modification" element={<AccountMod />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/previewCards" element={<PreviewCardsListing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
