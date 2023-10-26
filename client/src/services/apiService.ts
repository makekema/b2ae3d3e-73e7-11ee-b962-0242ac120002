import { Post } from "../types/post";

const BASE_URL = "https://my-json-server.typicode.com/typicode/demo/posts"

export async function getAllPosts (): Promise<Post[]> {
  try {
    const response = await fetch(BASE_URL, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  }
  catch (err) {
    throw new Error('An error occured');
  }
}