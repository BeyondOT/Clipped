import { useSelector } from "react-redux";
import Log from "../components/Log/Log";
import LeftNav from "../components/Navigation/LeftNav";
import NewPostForm from "../components/Post/NewPostForm";
import Thread from "../components/Post/Thread";
import { selectAuth } from "../features/authSlice";

const Home = () => {
  const { uid } = useSelector(selectAuth);
  return (
    <div className="home">
      <LeftNav />
      <div className="main">
        <div className="home-header">{uid ? <NewPostForm /> : <Log />}</div>
        <Thread />
      </div>
    </div>
  );
};

export default Home;
