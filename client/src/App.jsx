import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Routes from "./components/Routes";
import { UidContext } from "./contexts/AppContext";
import { getToken, getUser } from "./_actions/user.actions";
import { getUsers } from "./_actions/users.actions";


const App = () => {
  const { uid } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getToken());
    if (uid) dispatch(getUser(uid));
  }, [uid, dispatch]);

  return (
    <div>
      <UidContext.Provider value={uid}>
        <Routes />
      </UidContext.Provider>
    </div>
  );
};

export default App;
