import * as React from "react";
import { getUsersPostsService } from "../services/posts";
import PostCard from "../components/posts/PostCard";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";

interface IPost {
  id: number | string;
  body: string;
  title: string;
}
function Posts() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [posts, setPosts] = React.useState<IPost[]>([]);
  const [searchText, setSearchText] = React.useState("");
  const { userId } = useParams();

  const getUsers = async () => {
    setIsLoading(true);
    try {
      if (!userId) return;
      const data = await getUsersPostsService(userId);
      setPosts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  const removePost = (id: number | string) => {
    setPosts((posts) => posts.filter((post) => post.id !== id));
  };
  React.useEffect(() => {
    getUsers();
  }, []);

  React.useEffect(() => {
    setPosts((posts) =>
      searchText.length > 0
        ? posts.filter(
            (post) =>
              post.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1
          )
        : posts
    );
  }, [searchText]);

  if (!userId) return <>No Posts For this user</>;
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="m-20">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="relative outline-none rounded py-3 px-3 w-full bg-white shadow text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:shadow-outline"
              placeholder="Search by title..."
            />
          </div>
          {posts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              body={post.body}
              removePost={(id: number | string) => removePost(id)}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default Posts;
