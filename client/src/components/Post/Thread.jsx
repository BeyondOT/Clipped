import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../../utils/Utils";
import { getPosts } from "../../_actions/post.actions";
import Card from "./Card";

const Thread = () => {
  const [loadPost, setLoadPost] = useState(true);
  const { posts } = useSelector((state) => state.postsReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (loadPost) {
      dispatch(getPosts());
      setLoadPost(false);
    }
  }, [loadPost, dispatch]);

  return (
    <div className="thread-container">
      <ul>{!isEmpty(posts[0]) && posts.map((post) => <Card post={post} key={post._id}/>)}</ul>
    </div>
  );
};

export default Thread;
