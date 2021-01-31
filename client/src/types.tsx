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
}
