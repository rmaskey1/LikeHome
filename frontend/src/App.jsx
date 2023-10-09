import NavBar from "components/NavBar";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Details from "routes/Details";
import Home from "routes/Home";
import Login from "routes/Login";
import Register from "routes/Register";
import PreviewCardsListing from "components/PreviewCardsListing";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/hotel/:id" element={<Details />} />
        <Route path="/home" element={<PreviewCardsListing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
