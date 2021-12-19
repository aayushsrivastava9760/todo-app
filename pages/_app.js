import '../styles/globals.css'
import { AuthProvider } from '../context/auth'
import Nav from '../components/Nav'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Head>
        <title>ToDo App</title>
      </Head>
      <Nav />
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
