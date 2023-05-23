import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import Router from './routes';
import ThemeProvider from './theme';
import ScrollToTop from './components/scroll-to-top';
import { store } from './store';


export default function App() {
  return (
    <Provider store={store}>
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
        <Toaster toastOptions={{ duration: 5000 }} />
          <ScrollToTop />
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
    </Provider>
  );
}
