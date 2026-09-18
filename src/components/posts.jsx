import Post from "./post.jsx";
import { useContext } from "react";
import { Context } from "../App.jsx";

export default function Posts() {
  const { posts } = useContext(Context);
  return (
    <div className="mt-2">
      <ul className="bg-pink-500 rounded-md px-4 py-4 grid place-content-center grid-cols-[repeat(auto-fit,_minmax(300px,1fr))] gap-16 mb-16">
        {posts.map((post) => (
          <li key={post.id}>
            <Post post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
}
