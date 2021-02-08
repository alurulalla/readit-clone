export interface Post {
  identifier: string;
  username: string;
  body?: string;
  slug: string;
  title: string;
  subName: string;
  createdAt: string;
  updatedAt: string;
  // Virtual Fields
  url: string;
  voteScore?: number;
  commentCount?: number;
  userVote?: number;
}

export interface User {
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
