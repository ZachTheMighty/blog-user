import { useContext } from "react";
import { useParams } from "react-router";
import Post from "./post.jsx";
import Comments from "./comments.jsx";
import { Context } from "../App.jsx";
import Link from "./link.jsx";

export default function FullPost() {
  const { id } = useParams();
  const { posts } = useContext(Context);

  const post = posts && id ? posts.find((post) => post.id === +id) : null;

  if (!posts) return <div>Loading posts...</div>;
  if (!post)
    return (
      <div>
        Post doesn't exist <Link text="Go back" to="/dashboard" />
      </div>
    );
  return (
    <div className="bg-pink-500 p-4 mt-8 w-full sm:w-auto lg:mx-100 rounded-md flex flex-col gap-16">
      <Post post={post} full={true} />
      <Comments comments={post.comments} />
    </div>
  );
}
