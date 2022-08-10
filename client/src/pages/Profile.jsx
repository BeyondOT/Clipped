import React, { useContext } from "react";
import Log from "../components/Log/Log";
import UpdateProfile from "../components/Profile/UpdateProfile";
import { UidContext } from "../contexts/AppContext";

const Profile = () => {
  const uid = useContext(UidContext);
  return (
    <div className="profile-page">
      {uid ? (
        <UpdateProfile />
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
