import type { AppProps } from 'next/app'
import { ThemeProvider, DefaultTheme } from 'styled-components'
import { GlobalStyle } from '../components'
import Head from 'next/head'

const theme: DefaultTheme = {
  colors: {
    primary: '#1c1c1c',
    secondary: '#4ea0e9',
    tertiary: '#e7cf2e',
    quaternary: '#29db7c',
    quinary: '#ff6831',
    senary: '#fff',
  },
  fonts: {
    primary: 'Roboto Mono, monospace',
    secondary: 'Arimo, sans-serif'
  },
  widths: {
    desktop: '1180px',
    tablet: '768px'
  }
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <Head>
      <link
        rel="alternate"
        type="application/rss+xml"
        title="RSS"
        href="/feed.xml"
      />
      <link
        rel="preload"
        href="https://fonts.googleapis.com/css2?family=Arimo:ital,wght@0,700;1,400&family=Roboto+Mono&display=swap"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
    </Head>
    <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Component {...pageProps} />
    </ThemeProvider>
  </>
  )
}
