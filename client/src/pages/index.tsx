import Head from 'next/head';
import { useEffect, useState } from 'react';
import axios from 'axios';
import useSWR from 'swr';

import { Post } from '../types';
import PostCard from '../components/PostCard';

export default function Home() {
  // The below code in not required when we are using SWR (Stale-While-Revalidate)
  // const [posts, setPosts] = useState<Post[]>([]);

  // useEffect(() => {
  //   axios
  //     .get('/posts')
  //     .then((res) => setPosts(res.data))
  //     .catch((err) => console.log(err));
  // }, []);

  const { data: posts } = useSWR('/posts');

  return (
    <>
      <Head>
        <title>readit: the front page of the internet</title>
      </Head>
      <div className='container flex pt-4'>
        <div className='w-160'>
          {/* Posts Feed */}
          {posts?.map((post) => (
            <PostCard post={post} key={post.identifier} />
          ))}
          <div className='w-160'></div>
          {/* Sidebar */}
        </div>
      </div>
    </>
  );
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   try {
//     const res = await axios.get('/posts');
//     return { props: { posts: res.data } };
//   } catch (error) {
//     console.log(error);
//     return { props: { error: 'Something went wrong' } };
//   }
// };
