// External Dependencies
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ThemeProvider, createTheme } from '@mui/material';

// Local Dependencies
import App from './App.tsx'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24,
      staleTime: 1000 * 60 * 60 * 24,
    },
  },
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#143B38',
    },
    secondary: {
      main: '#E4CEC5'
    },
    info: {
      main: '#D7EA21'
    },
    error: {
      main: '#f44336'
    },
    success: {
      main: '#66bb6a'
    },
    warning: {
      main: '#D7EA21'
    }
  },
  typography:{
    fontFamily: 'Alegreya Sans SC Regular, Armata, Roboto'
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme} >
          <Provider store={store}>
            <App />
          </Provider>
        </ThemeProvider>
      </QueryClientProvider>
  </BrowserRouter>,
);
