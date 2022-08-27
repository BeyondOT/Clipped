import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import Routes from "./components/Routes";
import { getToken, selectAuth } from "./features/authSlice";
import { getUser } from "./features/userSlice";
import { getUsers } from "./features/usersSlice";

const App = () => {
  const { uid } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getToken());
    if (uid) dispatch(getUser(uid));
  }, [uid, dispatch]);

  return (
    <div>
      <Routes />
    </div>
  );
};

export default App;
