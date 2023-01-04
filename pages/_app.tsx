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
      <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤎</text></svg>" />
      <title>
        Jordan's house! But like digital...
      </title>
      <meta name="theme-color" content="#1c1c1c"/>
      <meta property="og:title" content="Jordan's house! But like digital..." key="title" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://jordanbooker.dev" key="url" />
      <meta property="og:image" content={process.env.VERCEL_URL + "/assets/defaultOG.png"} key="image" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
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
