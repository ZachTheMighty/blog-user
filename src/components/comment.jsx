export default function Comment({ comment }) {
  return (
    <div className="bg-pink-500 px-4 py-2 rounded-md text-white">
      <div className="flex justify-between sm:text-lg font-bold mb-2">
        <div>{comment.user.firstName + " " + comment.user.lastName}</div>
        <div>{comment.createdAt.split("T")[0]}</div>
      </div>
      <div className="text-lg sm:text-xl font-bold">{comment.body}</div>
    </div>
  );
}
