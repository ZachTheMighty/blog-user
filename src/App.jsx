import { createContext, useState } from "react";
import { Outlet } from "react-router";
export const Context = createContext(null);

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState(null);
  const [postsLoading, setPostsLoading] = useState(true);
  return (
    <Context
      value={{
        isAuth,
        setIsAuth,
        loading,
        setLoading,
        posts,
        setPosts,
        postsLoading,
        setPostsLoading,
      }}
    >
      <Outlet />
    </Context>
  );
}
