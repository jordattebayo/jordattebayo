import { DefaultTheme } from 'styled-components'
import { createContext } from 'react'
import { lightTheme } from './theme'

interface AppContextProps {
  settingsDialogState: boolean;
  requestDialogOpen?: () => any;
  requestDialogClose?: () => any;
  toggleDialog?: () => any;
  setSettingsDialogState?: any;
  selectedTheme: DefaultTheme;
  toggleTheme?: () => any;
  chooseTheme?: (theme: string) => any;
}

const initialContext: AppContextProps = {
    settingsDialogState: false,
    requestDialogOpen: () => null,
    requestDialogClose: () => null,
    selectedTheme: lightTheme,
    toggleTheme: () => null,
    chooseTheme: () => null
}
  
export const AppContext = createContext<AppContextProps>(initialContext);

export const withApp = (Child) => (props) => (
  <AppContext.Consumer>
    {(context) => <Child {...props} {...context} />}
  </AppContext.Consumer>
);