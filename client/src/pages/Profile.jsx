import React, { useContext } from "react";
import Log from "../components/Log/Log";
import { UidContext } from "../components/AppContext";

const Profile = () => {
  const uid = useContext(UidContext); 
  return (
    <div className="profile-page">
      {uid ? (
        <h1>Update Page</h1>
      ) : (
        <div className="log-container">
          <Log />
          <div className="img-container">
            <img src="./img/log.svg" alt="img-log" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
