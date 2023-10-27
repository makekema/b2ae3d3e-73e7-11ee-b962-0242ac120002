import { useState } from "react";
import { getAllPosts } from "../services/apiService";
import { Post } from "../types/post";

export function LandingPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  async function handleClick(): Promise<void> {
    setIsLoading(true);
    setError("");
    try {
      const fetchedPosts = await getAllPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      setError("The posts could not be loaded.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container-wrapper">
      <div className="container">
        <button onClick={handleClick} disabled={isLoading}>
          Load Posts
        </button>
        {error ? (
          <ErrorMessage error={error}/>
        ) : isLoading ? (
          <LoadingMessage message={'Loading posts...'} />
        ) : posts.length > 0 && (
          <PostsOverview posts={posts} />
        )}
      </div>
    </div>
  );
}

interface ErrorMessageProps { 
  error: string;
}
function ErrorMessage ({ error }: ErrorMessageProps) {
  return (
    <h2>{error}</h2>
  )
}

interface LoadingMessageProps { 
  message: string;
}
function LoadingMessage ({ message }: LoadingMessageProps) {
  return (
    <p>{message}</p>
  )
}

interface PostsOverviewProps { 
  posts: Post[];
}
function PostsOverview ({ posts }: PostsOverviewProps) {
  return (
    <div className="posts">
      <h2>Posts:</h2>
      <ul className="posts-list">
        {posts.map((post) => (
          <li key={post.id}>
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  )
}