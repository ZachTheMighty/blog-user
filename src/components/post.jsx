import { MessageCircle, Eye } from "lucide-react";
import { useContext } from "react";
import { Context } from "../App";
import { useNavigate } from "react-router";

export default function Post({ post, full }) {
  const { posts, setPosts } = useContext(Context);
  const navigate = useNavigate();

  const handleViewPost = async () => {
    if (full) return;
    await fetch(`http://localhost:8080/posts/${post.id}/views`, {
      method: "post",
    })
      .then((response) => response.json())
      .then((data) =>
        setPosts(
          posts.map((p) =>
            p.id === post.id ? { ...p, views: data.views } : p,
          ),
        ),
      )
      .catch((error) => console.log(error));

    navigate(`posts/${post.id}`);
  };

  return (
    <div
      onClick={handleViewPost}
      className={`bg-white rounded-md p-4 ${!full ? "hover:bg-gray-100 active:bg-gray-200" : ""} shadow-[0px_0px_20px_1px_rgba(255,255,255,0.3)]  ${!full ? "h-85" : ""} flex flex-col justify-between gap-8`}
    >
      <div>
        <div
          className={`text-2xl font-bold sm:text-3xl mb-2 ${!full ? "line-clamp-1" : "break-words"}`}
        >
          {post.title}
        </div>
        <div className={`${!full ? "line-clamp-3" : "break-all"}`}>
          {post.body}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between font-bold">
          <div>{post.createdAt.split("T")[0]}</div>
          <div className="flex gap-4 text-gray-400">
            <div className="flex gap-2">
              <div>{post.comments.length}</div>
              <MessageCircle />
            </div>
            <div className="flex gap-2">
              <div>{post.views}</div>
              <Eye />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
