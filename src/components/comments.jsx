import { useParams } from "react-router";
import Comment from "./comment.jsx";
import Input from "./input.jsx";
import { useContext, useState } from "react";
import { Context } from "../App.jsx";

export default function Comments({ comments }) {
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState(null);

  const { id } = useParams();
  const { posts, setPosts } = useContext(Context);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(
      `https://blog-api-ljzu.onrender.com/posts/${id}/comments`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          comment,
        }),
      },
    );

    const data = await response.json();
    if (!response.ok)
      return setErrors({ errors: data.error, status: response.status });

    setErrors(null);
    setPosts(
      posts.map((post) =>
        post.id === data.postId
          ? { ...post, comments: [...comments, data] }
          : post,
      ),
    );
  };

  return (
    <div className="bg-white rounded-md p-4">
      <div className="text-xl font-bold sm:text-2xl mb-4">Comments:</div>
      <form onSubmit={(event) => handleSubmit(event)}>
        <Input
          type="text"
          name="comment"
          text="comment"
          value={comment}
          setValue={setComment}
          errors={errors}
        />
        <button className="bg-pink-500 px-4 py-2 rounded-md text-white hover:bg-pink-600 active:bg-pink-500 font-bold my-4">
          Post comment
        </button>
      </form>
      <ul className="flex flex-col gap-8 mt-2">
        {comments.length === 0 ? (
          <div>This post has no comments yet.</div>
        ) : (
          comments.map((comment) => (
            <li key={comment.id}>
              <Comment comment={comment} />
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
