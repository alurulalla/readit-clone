import Head from 'next/head';
import useSWR, { useSWRInfinite } from 'swr';
import Image from 'next/image';

import { Post, Sub } from '../types';
import PostCard from '../components/PostCard';
import Link from 'next/link';
import { useAuthState } from '../context/auth';
import { useEffect, useState } from 'react';

export default function Home() {
  // The below code in not required when we are using SWR (Stale-While-Revalidate)
  // const [posts, setPosts] = useState<Post[]>([]);

  // useEffect(() => {
  //   axios
  //     .get('/posts')
  //     .then((res) => setPosts(res.data))
  //     .catch((err) => console.log(err));
  // }, []);

  // Local State
  const [observedPost, setObservedPost] = useState('');

  // const { data: posts } = useSWR<Post[]>('/posts');
  const { data: topSubs } = useSWR<Sub[]>('/misc/top-subs');

  const title = 'readit: the front page of the internet';
  const description = `Readit is a network of communities based on people's interests. Find communities you're interested in , and become part of online community!`;

  const { authenticated } = useAuthState();

  const {
    data,
    error,
    mutate,
    size: page,
    setSize: setPage,
    isValidating,
    revalidate,
  } = useSWRInfinite<Post[]>((index) => `/posts?page=${index}`);

  const posts: Post[] = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error;

  useEffect(() => {
    if (!posts || posts.length === 0) return;

    const id = posts[posts.length - 1].identifier;

    if (id !== observedPost) {
      setObservedPost(id);
      observeElement(document.getElementById(id));
    }
  }, [posts]);

  const observeElement = (element: HTMLElement) => {
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting === true) {
          console.log('Reached bottom of post');
          setPage(page + 1);
        }
      },
      { threshold: 1 }
    );
    observer.observe(element);
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description}></meta>
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='twitter:title' content={title} />
        <meta property='twitter:description' content={description} />
      </Head>
      <div className='container flex pt-4 md:p-4'>
        <div className='w-full px-4 md:w-160 md:p-0'>
          {/* Posts Feed */}
          {isLoadingInitialData && (
            <p className='text-lg text-center'>Loading...</p>
          )}
          {posts?.map((post) => (
            <PostCard
              post={post}
              key={post.identifier}
              revalidate={revalidate}
            />
          ))}
          {isValidating && posts.length > 0 && (
            <p className='text-lg text-center'>Loading More...</p>
          )}
        </div>
        {/* Sidebar */}
        <div className='hidden ml-6 md:block w-80'>
          <div className='bg-white rounded'>
            <div className='p-4 border-b-2'>
              <p className='text-lg font-semibold text-center'>
                Top Communities
              </p>
            </div>
            <div>
              {topSubs?.map((sub) => (
                <div
                  key={sub.name}
                  className='flex items-center px-4 py-2 text-xs border-b'
                >
                  <Link href={`/r/${sub.name}`}>
                    <a>
                      <Image
                        src={sub.imageUrl}
                        alt='Sub'
                        className='rounded-full cursor-pointer'
                        width={(6 * 16) / 4}
                        height={(6 * 16) / 4}
                      />
                    </a>
                  </Link>
                  <Link href={`/r/${sub.name}`}>
                    <a className='ml-2 font-bold hover:cursor-pointer'>
                      /r/{sub.name}
                    </a>
                  </Link>
                  <p className='ml-auto font-med'>{sub.postCount}</p>
                </div>
              ))}
            </div>
            {authenticated && (
              <div className='p-4 border-t-2'>
                <Link href='/subs/create'>
                  <a className='w-full px-2 py-1 blue button'>
                    Create Community
                  </a>
                </Link>
              </div>
            )}
          </div>
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
