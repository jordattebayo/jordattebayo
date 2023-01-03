import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { ThemeProvider, DefaultTheme } from 'styled-components'
import { GlobalStyle } from '../components'
import Head from 'next/head'
import '../blog-styles.css'
import { lightTheme, darkTheme } from '../lib/theme'
import { AppContext } from '../lib/context'


export default function App({ Component, pageProps }: AppProps) {
  const [selectedTheme, setSelectedTheme] = useState<DefaultTheme>(lightTheme)
  const [settingsDialogState, setSettingsDialogState] = useState<boolean>(false);


  function chooseTheme(theme: string) {
    switch(theme){
      case "light":
        setSelectedTheme(lightTheme)
        break;
      case 'dark':
        setSelectedTheme(darkTheme)
        break;
      default:
        break;
    }
  }

  function toggleTheme(){
    if(selectedTheme === lightTheme){
      setSelectedTheme(darkTheme)
    } else {
      setSelectedTheme(lightTheme)
    }
  }

  function requestDialogOpen(){
    if (settingsDialogState) return 
    setSettingsDialogState(true)
  }

  function requestDialogClose(){
    //if (!settingsDialogState) return 
    console.log("request close called")
    setSettingsDialogState(false)
  }

  function toggleDialog(){
    setSettingsDialogState(settingsDialogState => !settingsDialogState)
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
      <AppContext.Provider value={{
        settingsDialogState, 
        requestDialogOpen, 
        requestDialogClose,
        toggleDialog,
        setSettingsDialogState,
        selectedTheme, 
        toggleTheme, 
        chooseTheme
        }}>
        <Component {...pageProps} setSelectedTheme={toggleTheme} /> 
      </AppContext.Provider>
    </ThemeProvider>
  </>
  )
}
