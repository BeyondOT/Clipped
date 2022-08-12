import { useContext } from "react";
import { useSelector } from "react-redux";
import Log from "../components/Log/Log";
import UpdateProfile from "../components/Profile/UpdateProfile";
import { UidContext } from "../contexts/AppContext";

const Profile = () => {
  const uid = useContext(UidContext);
  const { loading } = useSelector((state) => state.userReducer);

  if (loading) {
    console.log("is loading");
    return <div>Is loading</div>;
  }
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
