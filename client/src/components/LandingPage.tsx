import React, { useEffect, useState } from "react";
import { getAllPosts } from "../services/apiService";
import { Post } from "../types/post";

export function LandingPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleClick(): Promise<void> {
    setIsLoading(true);
    setError("");
    try {
      const fetchedPosts = await getAllPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      setError("The posts could not be loaded.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="landing-page-container">
      <button className="button" onClick={handleClick} disabled={isLoading}>
        Load Posts
      </button>
      <div className="status-message">
        {error ? (
          <div className="error-message">
            <h2>{error}</h2>
          </div>
        ) : isLoading ? (
          <p>Loading posts...</p>
        ) : (
          posts.length > 0 && (
            <div className="post-list">
              <div className="post-list-title">
                <h2>Posts</h2>
              </div>
              <ul>
                {posts.map((post) => (
                  <li className="post-list-element" key={post.id}>
                    {post.title}
                  </li>
                ))}
              </ul>
            </div>
          )
        )}
      </div>
    </div>
  );
}