import React from "react";
import { Home, Profile, Trending } from "../../pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../Navigation/Navbar";

const index = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/trending" element={<Trending />} />
      </Routes>
    </BrowserRouter>
  );
};

export default index;
