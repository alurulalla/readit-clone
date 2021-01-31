import Head from 'next/head';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

import InputGroup from '../components/InputGroup';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<any>({});

  const router = useRouter();

  const onLogin = async (e: FormEvent) => {
    e.preventDefault();

    const data = {
      username,
      password,
    };
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      await axios.post('/auth/login', data, config);
      router.push('/');
    } catch (err) {
      console.log(err.response.data);
      setErrors(err.response.data);
    }
  };

  return (
    <div className='flex bg-white'>
      <Head>
        <title>Login</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div
        className='h-screen bg-center bg-cover w-36'
        style={{ backgroundImage: "url('/images/bricks.jpg" }}
      ></div>

      <div className='flex flex-col justify-center pl-6'>
        <div className='w-70'>
          <h1 className='mb-2 text-lg font-medium'>Sign up</h1>
          <p className='mb-10 text-xs'>
            By continuing, you agree to our User Agreement and Privacy Policy
          </p>
          <form onSubmit={onLogin}>
            <InputGroup
              className='mb-2'
              type='text'
              value={username}
              setValue={setUsername}
              error={errors.username}
              placeholder='USERNAME'
            />

            <InputGroup
              className='mb-2'
              type='password'
              value={password}
              setValue={setPassword}
              error={errors.password}
              placeholder='PASSWORD'
            />
            <button className='w-full py-2 mb-4 text-xs font-bold text-white uppercase bg-blue-500 border-blue-500 rounded'>
              Login
            </button>
          </form>
          <small>
            New to Readit? Click here
            <Link href='/register'>
              <a className='ml-1 text-blue-500 uppercase'>Register</a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}
