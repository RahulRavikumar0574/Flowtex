import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom'
import { useLenis } from './hooks/useLenis'
import { AuthProvider } from './context/AuthContext'
import { QuoteNotificationsProvider } from './context/QuoteNotificationsContext'
import { Navbar } from './components/layout/Navbar'
import { MobileCTA } from './components/layout/MobileCTA'
import { Footer } from './components/layout/Footer'
import { ScrollToTop } from './components/layout/ScrollToTop'
import { HomePage } from './pages/HomePage'
import { CertificationsPage } from './pages/CertificationsPage'
import { ProductsPage } from './pages/ProductsPage'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'
import { QuotesPage } from './pages/account/QuotesPage'
import { QuoteConversationPage } from './pages/account/QuoteConversationPage'
import { AdminLoginPage } from './pages/admin/AdminLoginPage'
import { AdminLayout } from './pages/admin/AdminLayout'
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage'
import { AdminRequestDetailPage } from './pages/admin/AdminRequestDetailPage'

function CustomerShell() {
  useLenis()
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <MobileCTA />
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <QuoteNotificationsProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="dashboard/requests/:id" element={<AdminRequestDetailPage />} />
          </Route>

          <Route element={<CustomerShell />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:slug" element={<ProductDetailPage />} />
            <Route path="/certifications" element={<CertificationsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/account/quotes" element={<QuotesPage />} />
            <Route path="/account/quotes/:id" element={<QuoteConversationPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </QuoteNotificationsProvider>
    </AuthProvider>
  )
}

export default App
