import { DefaultTheme } from 'styled-components'

export const lightTheme: DefaultTheme = {
    name: "light",
    colors: {
      primary: '#1c1c1c',
      secondary: '#4ea0e9',
      tertiary: '#ff6831',
      quaternary: '#29db7c',
      quinary: '#e7cf2e',
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
  
  export const darkTheme: DefaultTheme = {
    name: "dark",
    colors: {
      primary: '#c7c7c7',
      secondary: '#E84545',
      tertiary: '#903749',
      quaternary: '#3F0071',
      quinary: '#FB2576',
      senary: '#1c1c1c',
      septenary: '#3F0071',
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
  