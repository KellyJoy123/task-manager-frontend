import { CssVarsProvider } from '@mui/joy/styles'
import CssBaseline from '@mui/joy/CssBaseline'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import theme from './theme'
import HomePage from './pages/HomePage'
import { AuthProvider, useAuth } from './context/AuthContext'
import AuthPage from './pages/AuthPage'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function AppContent() {
  const { user, loading } = useAuth()

  if (loading) return null;

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <AuthPage />} />
      <Route path="/" element={
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CssVarsProvider theme={theme} defaultMode="light">
          <CssBaseline />
          <AppContent />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css"
          />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: { borderRadius: '10px', background: '#1a0f2e', color: '#e0d4ff' },
              success: { iconTheme: { primary: '#a855f7', secondary: '#1a0f2e' } },
            }}
          />
        </CssVarsProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
