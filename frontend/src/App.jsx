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
import MyBookings from "routes/MyBookings";
import ModifyBooking from "routes/ModifyBooking";
import Home from "routes/Home";
import BookingForm from "routes/BookingForm";
import BookingSuccess from "routes/BookingSuccess";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/hotel" element={<RegisterHotel />} />

        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/profile/:id/modify" element={<AccountMod />} />

        <Route path="/room/add" element={<AddListing />} />
        <Route path="/room/:id" element={<Details />} />
        <Route path="/room/:id/modify" element={<ModifyListing />} />
        <Route path="/room/:id/book" element={<BookingForm />} />
        <Route path="/room/:id/book/success" element={<BookingSuccess />} />
        <Route path="/room/:id/modifybooking" element={<ModifyBooking />} />
        <Route path="/room/:id/cancel" element={<BookingForm />} />
        <Route path="/room/:id/cancel/success" element={<BookingSuccess />} />

        <Route path="/mybooking" element={<MyBookings />} />
        <Route path="/mybooking/:id/modify" element={<ModifyBooking />} />
        <Route path="/mybooking/:id/cancel" element={<BookingForm />} />
        <Route
          path="/mybooking/:id/cancel/success"
          element={<BookingSuccess />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
