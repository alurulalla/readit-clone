import Link from 'next/link';
import RedditLogo from '../images/reddit_logo.svg';

import { useAuthDispatch, useAuthState } from '../context/auth';
import axios from 'axios';

const NavBar = () => {
  const { authenticated, user, loading } = useAuthState();
  const dispatch = useAuthDispatch();

  const logout = () => {
    axios
      .get('/auth/logout')
      .then(() => {
        dispatch('LOGOUT', null);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='fixed inset-x-0 top-0 z-10 flex items-center justify-center h-12 px-5 bg-white'>
      {/* Logo and title*/}
      <div className='flex items-center'>
        <Link href='/'>
          <a>
            <RedditLogo className='w-8 h-8 mr-2' />
          </a>
        </Link>
        <span className='text-2xl font-semibold'>readit</span>
      </div>
      {/* Search Input */}
      <div className='flex items-center mx-auto bg-gray-100 border rouded hover:border-blue-500 hover:bg-white'>
        <i className='pl-4 pr-3 text-gray-500 fas fa-search'></i>
        <input
          type='text'
          className='py-1 pr-3 bg-transparent rounded focus:outline-none w-160'
          placeholder='Search'
        />
      </div>
      {/* Auth buttons */}
      <div className='flex'>
        {!loading && !authenticated ? (
          <>
            <Link href='/login'>
              <a className='w-32 py-1 mr-5 leading-5 hollow blue button'>
                log in
              </a>
            </Link>
            <Link href='/register'>
              <a className='w-32 py-1 leading-5 blue button'>register</a>
            </Link>
          </>
        ) : (
          <button
            className='w-32 py-1 mr-5 leading-5 hollow blue button'
            onClick={logout}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
