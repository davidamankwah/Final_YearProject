import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts} from "../../state";
import PostWidget from "./PostWidget";

const PostsWid = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch("http://localhost:4000/posts", {
      method: "GET",
      headers: { Permitted: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:4000/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Permitted: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          userName,
          text,
          picturePath,
          profileImage,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${userName}`}
            text={text}
            picturePath={picturePath}
            profileImage={profileImage}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWid;