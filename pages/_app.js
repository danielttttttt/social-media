import '../styles/globals.css';
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="app-bg min-h-screen">
          <Component {...pageProps} />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}
