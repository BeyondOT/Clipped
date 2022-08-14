import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../../utils/Utils";
import { getPosts } from "../../_actions/post.actions";
import Card from "./Card";

const Thread = () => {
  const [count, setCount] = useState(5);
  const [loadPost, setLoadPost] = useState(true);
  const { posts } = useSelector((state) => state.postsReducer);
  const dispatch = useDispatch();

  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    ) {
      setLoadPost(true);
    }
  };

  useEffect(() => {
    if (loadPost) {
      dispatch(getPosts(count));
      setLoadPost(false);
      setCount(count + 5);
    }

    window.addEventListener("scroll", loadMore);
    return () => window.removeEventListener("scroll", loadMore);
  }, [loadPost, dispatch, count]);

  return (
    <div className="thread-container">
      <ul>
        {!isEmpty(posts[0]) &&
          posts.map((post) => <Card post={post} key={post._id} />)}
      </ul>
    </div>
    
  );
};

export default Thread;
