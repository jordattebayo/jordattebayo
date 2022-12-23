import type { AppProps } from 'next/app'
import { useState } from 'react'
import { ThemeProvider, DefaultTheme } from 'styled-components'
import { GlobalStyle } from '../components'
import Head from 'next/head'
import '../blog-styles.css'

export const theme: DefaultTheme = {
  colors: {
    primary: '#1c1c1c',
    secondary: '#4ea0e9',
    tertiary: '#e7cf2e',
    quaternary: '#29db7c',
    quinary: '#ff6831',
    senary: '#fff',
    septenary: '#B324E0',
    octenary: '#D9D9D9'
  },
  fonts: {
    primary: 'Roboto Mono, monospace',
    secondary: 'Arimo, sans-serif'
  },
  widths: {
    desktop: '1180px',
    tablet: '768px',
    mobile: '450px'
  }
}

export const themeTwo: DefaultTheme = {
  colors: {
    primary: '#1c1c1c',
    secondary: '#29db7c',
    tertiary: '#B324E0',
    quaternary: '#ff6831',
    quinary: '#e7cf2e',
    senary: '#fff',
    septenary: '#4ea0e9',
    octenary: '#D9D9D9'
  },
  fonts: {
    primary: 'Roboto Mono, monospace',
    secondary: 'Arimo, sans-serif'
  },
  widths: {
    desktop: '1180px',
    tablet: '768px',
    mobile: '450px'
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const [selectedTheme, setSelectedTheme] = useState<DefaultTheme>(theme)

  function toggleTheme(){
    if(selectedTheme === theme){
      setSelectedTheme(themeTwo)
    } else {
      setSelectedTheme(theme)
    }
  }

  return (
    <>
    <Head>
      {/* <link
        rel="alternate"
        type="application/rss+xml"
        title="RSS"
        href="/feed.xml"
      /> */}
      <link
        rel="preload"
        href="https://fonts.googleapis.com/css2?family=Arimo:ital,wght@0,700;1,400&family=Roboto+Mono&display=swap"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
    </Head>
    <ThemeProvider theme={selectedTheme}>
    <GlobalStyle />
    <Component {...pageProps} setSelectedTheme={toggleTheme} />
    </ThemeProvider>
  </>
  )
}
