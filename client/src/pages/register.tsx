import Head from 'next/head';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuthState } from '../context/auth';

import InputGroup from '../components/InputGroup';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [agreement, setAgreement] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const { authenticated } = useAuthState();

  const router = useRouter();

  if (authenticated) router.push('/');

  const onRegister = async (e: FormEvent) => {
    e.preventDefault();

    if (!agreement) {
      setErrors({ ...errors, agreement: 'You must agree to T&C' });
      return;
    }
    const data = {
      email,
      username,
      password,
    };
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      await axios.post('/auth/register', data, config);
      router.push('/login');
    } catch (err) {
      console.log(err.response.data);
      setErrors(err.response.data);
    }
  };

  return (
    <div className='flex bg-white'>
      <Head>
        <title>Register</title>
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
          <form onSubmit={onRegister}>
            <div className='mb-6'>
              <input
                type='checkbox'
                className='mr-1 cursor-pointer'
                id='agreement'
                checked={agreement}
                onChange={(e) => setAgreement(!agreement)}
              />
              <label htmlFor='agreement' className='text-xs cursor-pointer'>
                I agree to get emails about cool stuff on Readit
              </label>
              <small className='block font-medium text-red-600'>
                {errors.agreement}
              </small>
            </div>

            <InputGroup
              className='mb-2'
              type='email'
              value={email}
              setValue={setEmail}
              error={errors.email}
              placeholder='EMAIL'
            />

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
              Sign Up
            </button>
          </form>
          <small>
            Already a readitor?
            <Link href='/login'>
              <a className='ml-1 text-blue-500 uppercase'>Login</a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}
