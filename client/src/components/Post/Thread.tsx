import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getPosts, selectPosts } from "../../features/postsSlice";
import { Post } from "../../interfaces/post.types";
import { isEmpty } from "../../utils/Utils";
import Card from "./Card";

const Thread = () => {
  const [count, setCount] = useState(5);
  const [loadPost, setLoadPost] = useState(true);
  const { postsList } = useAppSelector(selectPosts);
  const dispatch = useAppDispatch();

  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement!.scrollHeight
    ) {
      setLoadPost(true);
    }
  };

  useEffect(() => {
    if (loadPost) {
      dispatch(getPosts());
      setLoadPost(false);
      setCount(count + 5);
    }

    window.addEventListener("scroll", loadMore);
    return () => window.removeEventListener("scroll", loadMore);
  }, [loadPost, dispatch, count]);

  return (
    <div className="thread-container">
      <ul>
        {!isEmpty(postsList[0]) &&
          postsList.map((post:Post) => <Card post={post} key={post._id} />)}
      </ul>
    </div>
  );
};

export default Thread;
