import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import Home from './pages/Home'
import Admin from './pages/Admin'
import Contact from './pages/Contact'
import Don from './pages/Don'
import Evenements from './pages/Evenements'
import Galerie from './pages/Galerie'
import Messages from './pages/Messages'
import PolitiqueConfidentialite from './pages/PolitiqueConfidentialite'
import Navbar from './components/Navbar'
import WhatsAppButton from './components/WhatsAppButton'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/don" element={<Don />} />
          <Route path="/evenements" element={<Evenements />} />
          <Route path="/galerie" element={<Galerie />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
        </Routes>
        <WhatsAppButton />
        <Toaster position="top-right" richColors />
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
