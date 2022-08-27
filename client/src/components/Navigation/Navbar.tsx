import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectAuth } from "../../features/authSlice";
import { selectUser } from "../../features/userSlice";
import Logout from "../Log/Logout";

const Navbar = () => {
  const { userData} = useAppSelector(selectUser);
  const { uid } = useAppSelector(selectAuth)

  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <Link to="/">
            <div className="logo">
              <img src="./img/icon.png" alt="logo" />
              <h3>Clipped</h3>
            </div>
          </Link>
        </div>
        {uid ? (
          <ul>
            <li></li>
            <li className="welcome">
              <Link to="/profile">
                <h5>Bienvenue {userData.pseudo}</h5>
              </Link>
            </li>
            <Logout />
          </ul>
        ) : (
          <ul>
            <li></li>
            <li>
              <Link to="/profile">
                <img src="./img/icons/login.svg" alt="login" />
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
