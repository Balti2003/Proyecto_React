import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { AppRouter } from './routes/AppRouter'
import { AuthProvider } from './auth/context/AuthContext'
import { ModalProvider } from './shared/components/Modal/context/ModalContext'

function App() {
  return (
    <AuthProvider>
      <ModalProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </ModalProvider>
    </AuthProvider>
  )
}

export default App