import { FormEvent, useState } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import InputGroup from '../../components/InputGroup';
import { useRouter } from 'next/router';

export default function Create() {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<Partial<any>>({});

  const router = useRouter();

  const submitForm = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const res = await axios.post(`/subs`, { name, title, description });

      router.push(`/r/${res.data.name}`);
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };

  return (
    <div className='flex bg-white'>
      <Head>
        <title>Create a Community</title>
      </Head>
      <div
        className='h-screen bg-center bg-cover w-36'
        style={{ backgroundImage: "url('/images/bricks.jpg" }}
      ></div>
      <div className='flex flex-col justify-center pl-6'>
        <div className='w-98'>
          <h1 className='mb-2 text-lg font-medium'>Create a Community</h1>
          <hr />
          <form onSubmit={submitForm}>
            <div className='my-6'>
              <p className='font-medium'>Name</p>
              <p className='mb-2 text-xs text-gray-500'>
                Community names including capitalization cannot be changed.
              </p>
              <InputGroup
                type='text'
                value={name}
                setValue={setName}
                error={errors.name}
                placeholder='Community name'
              />
            </div>
            <div className='my-6'>
              <p className='font-medium'>Title</p>
              <p className='mb-2 text-xs text-gray-500'>
                Community title represent the topic and you change it at any
                time.
              </p>
              <InputGroup
                type='text'
                value={title}
                setValue={setTitle}
                error={errors.title}
                placeholder='Title name'
              />
            </div>
            <div className='my-6'>
              <p className='font-medium'>Description</p>
              <p className='mb-2 text-xs text-gray-500'>
                This is how new members come to understand your community.
              </p>
              <textarea
                className='w-full p-3 py-2 transition duration-200 border border-gray-300 rounded outline-none bg-gray-50 focus:bg-white hover:bg-white'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className='flex justify-end'>
              <button className='px-4 py-1 text-sm font-semibold capitalize blue button'>
                Create Community
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    const cookie = req.headers.cookie;
    if (!cookie) throw new Error('Missing auth token cookie');

    await axios.get('/auth/me', { headers: { cookie } });

    return { props: {} };
  } catch (error) {
    res.writeHead(307, { Location: '/login' }).end();
  }
};
