import { DefaultTheme } from 'styled-components'
import { useState, createContext } from 'react'
import { lightTheme, darkTheme } from './theme'

interface AppContextProps {
    settingsDialogOpen: boolean;
    setSettingsDialogOpen: any;
    theme: DefaultTheme;
    setTheme: any;
}

const initialContext: AppContextProps = {
    settingsDialogOpen: false,
    setSettingsDialogOpen: () => null,
    theme: lightTheme,
    setTheme: () => null
}
  
export const AppContext = createContext<AppContextProps>(initialContext);

export const withApp = (Child) => (props) => (
  <AppContext.Consumer>
    {(context) => <Child {...props} {...context} />}
  </AppContext.Consumer>
);