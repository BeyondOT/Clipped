import React from "react";
import { useSelector } from "react-redux";
import LeftNav from "../LeftNav";
import UploadImg from "./UploadImg";

const UpdateProfile = () => {
  const userData = useSelector((state) => state.userReducer);

  return (
    <div className="profile-container">
      <LeftNav />
      <h1>Profile de {userData.pseudo}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profile</h3>
          <img src={userData.picture} alt="user-pic" />
          <UploadImg />
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;

