import Head from 'next/head';
import useSWR from 'swr';
import Image from 'next/image';

import { Sub } from '../types';
import PostCard from '../components/PostCard';
import Link from 'next/link';

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
  const { data: topSubs } = useSWR('/misc/top-subs');

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
        </div>
        {/* Sidebar */}
        <div className='w-160'>
          <div className='ml-6 w-80'>
            <div className='bg-white rounded'>
              <div className='p-4 border-b-2'>
                <p className='text-lg font-semibold text-center'>
                  Top Communities
                </p>
              </div>
              <div>
                {topSubs?.map((s: Sub) => (
                  <div
                    key={s.name}
                    className='flex items-center px-4 py-2 text-xs border-b'
                  >
                    <div className='mr-2 overflow-hidden rounded-full cursor-pointer'>
                      <Link href={`/r/${s.name}`}>
                        <Image
                          src={s.imageUrl}
                          alt='Sub'
                          width={(6 * 16) / 4}
                          height={(6 * 16) / 4}
                        />
                      </Link>
                    </div>
                    <Link href={`/r/${s.name}`}>
                      <a className='font-bold hover:cursor-pointer'>
                        /r/${s.name}
                      </a>
                    </Link>
                    <p className='ml-auto font-med'>{s.postCount}</p>
                  </div>
                ))}
              </div>
            </div>
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
