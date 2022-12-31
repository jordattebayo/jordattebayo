import type { AppProps } from 'next/app'
import { useState } from 'react'
import { ThemeProvider, DefaultTheme } from 'styled-components'
import { GlobalStyle } from '../components'
import Head from 'next/head'
import '../blog-styles.css'
import { lightTheme, darkTheme } from '../lib/theme'
import { AppContext } from '../lib/context'


export default function App({ Component, pageProps }: AppProps) {
  const [selectedTheme, setSelectedTheme] = useState<DefaultTheme>(lightTheme)

  const [settingsDialogOpen, setSettingsDialogOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<DefaultTheme>(lightTheme);

  function toggleTheme(){
    if(selectedTheme === lightTheme){
      setSelectedTheme(darkTheme)
    } else {
      setSelectedTheme(lightTheme)
    }
  }

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
    <ThemeProvider theme={selectedTheme}>
    <GlobalStyle />
      <AppContext.Provider value={{settingsDialogOpen, setSettingsDialogOpen, theme, setTheme}}>
        <Component {...pageProps} setSelectedTheme={toggleTheme} /> 
      </AppContext.Provider>
    </ThemeProvider>
  </>
  )
}
