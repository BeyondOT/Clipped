import { React, useState, useEffect } from "react";
import { UidContext } from "./contexts/AppContext";
import Routes from "./components/Routes";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";

const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();
  const fetchToken = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/jwtid`,
      withCredentials: true,
    })
      .then((res) => {
        setUid(res.data);
      })
      .catch((err) => {
        console.log("No token");
      });
  };

  useEffect(() => {
    fetchToken();
    if (uid) dispatch(getUser(uid));
  }, [uid]);

  return (
    <div>
      <UidContext.Provider value={uid}>
        <Routes />
      </UidContext.Provider>
    </div>
  );
};

export default App;
