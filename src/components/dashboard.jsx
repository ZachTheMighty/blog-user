import { Outlet } from "react-router";
import { useContext, useEffect, useState } from "react";
import Navbar from "./navbar.jsx";
import { Context } from "../App.jsx";

export default function Dashboard() {
  const [userName, setUserName] = useState("");
  const { setIsAuth, setLoading, setPosts, setPostsLoading } =
    useContext(Context);

  useEffect(() => {
    fetch(
      "http://localhost:8080/tokens",
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
      [],
    )
      .then((res) => res.json())
      .then((data) => {
        setIsAuth(data.isAuth);
        setUserName(
          `${data.payload.user.firstName} ${data.payload.user.lastName}`,
        );
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));

    fetch("http://localhost:8080/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data.filter((item) => item.published)))
      .catch((error) => console.log(error))
      .finally(() => setPostsLoading(false));
  }, []);

  return (
    <div className="flex flex-col items-center sm:block sm:p-5">
      <Navbar userName={userName} />
      <Outlet />
    </div>
  );
}
