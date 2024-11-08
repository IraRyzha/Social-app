import { getUserFriendsPosts } from "./api/get-friends-posts";
import { getPosts } from "./api/get-posts";
import { getPostsByUserId } from "./api/get-user-posts";
import { IPost } from "./model/types";
import { Post } from "./ui/post";

export type { IPost };
export { Post, getPosts, getPostsByUserId, getUserFriendsPosts };
