import { AppProps } from 'next/app';
import axios from 'axios';
import { useRouter } from 'next/router';

import { AuthProvider } from '../context/auth';

import '../styles/tailwind.css';
import '../styles/icons.css';

import NavBar from '../components/NavBar';

axios.defaults.baseURL = 'http://localhost:5000/api';
axios.defaults.withCredentials = true;

function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const authRoutes = ['/login', '/register'];
  const authRoute = authRoutes.includes(pathname);
  return (
    <AuthProvider>
      {!authRoute && <NavBar />}
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default App;
