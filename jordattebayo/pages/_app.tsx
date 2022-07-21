import type { AppProps } from 'next/app'
import { ThemeProvider, DefaultTheme } from 'styled-components'
import GlobalStyle from '../components/globalstyles'

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
  }
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Component {...pageProps} />
    </ThemeProvider>
  )
}
