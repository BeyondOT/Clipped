import { useAppSelector } from "../app/hooks";
import Log from "../components/Log/Log";
import UpdateProfile from "../components/Profile/UpdateProfile";
import { selectAuth } from "../features/authSlice";
import { selectUser } from "../features/userSlice";

const Profile = () => {
  const { loading } = useAppSelector(selectUser);
  const { uid } = useAppSelector(selectAuth);

  if (loading) {
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
