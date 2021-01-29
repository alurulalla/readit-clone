import Head from 'next/head';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [agreement, setAgreement] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const onRegister = async (e: FormEvent) => {
    e.preventDefault();
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
      const resData = await axios.post('/auth/register', data, config);
      console.log(resData);
    } catch (err) {
      console.log(err.response.data);
      setErrors(err.response.data);
    }
  };

  return (
    <div className='flex'>
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
            </div>
            <div className='mb-2'>
              <input
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={classNames(
                  'w-full p-3 py-2 transition duration-200 border border-gray-300 rounded outline-none bg-gray-50 focus:bg-white hover:bg-white',
                  { 'border-red-500': errors.email }
                )}
              />
              {errors && errors.email && (
                <small className='font-medium text-red-600'>
                  {errors.email}
                </small>
              )}
            </div>
            <div className='mb-2'>
              <input
                type='text'
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={classNames(
                  'w-full px-3 py-2 transition duration-200 bg-gray-100 border border-gray-300 rounded outline-none focus:bg-white hover:bg-white',
                  { 'border-red-500': errors.username }
                )}
              />
              {errors && errors.username && (
                <small className='font-medium text-red-600'>
                  {errors.username}
                </small>
              )}
            </div>
            <div className='mb-2'>
              <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={classNames(
                  'w-full px-3 py-2 transition duration-200 bg-gray-100 border border-gray-300 rounded outline-none focus:bg-white hover:bg-white',
                  { 'border-red-500': errors.password }
                )}
              />
              {errors && errors.password && (
                <small className='font-medium text-red-600'>
                  {errors.password}
                </small>
              )}
            </div>
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
