import Head from 'next/head'
import '../styles/globals.css'

import ErrorNotification from '../src/components/ui/ErrorNotification'

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Component {...pageProps} />
            <ErrorNotification />
        </>
    )
}

export default MyApp
