import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import ProductsPage from './pages/Products'
import Sales from './pages/Sales'
import Settings from './pages/Settings'
import { useAuth } from './contexts/AuthContext'

const pages = {
  dashboard: Dashboard,
  products: ProductsPage,
  sales: Sales,
  settings: Settings,
}

export default function AppContent() {
  const [activePage, setActivePage] = useState('dashboard')
  const { logout, user } = useAuth()
  const PageComponent = pages[activePage]

  const handleLogout = async () => {
    await logout()
  }

  return (
    <div className="flex min-h-screen bg-slate-900">
      <Sidebar activePage={activePage} onNavigate={setActivePage} onLogout={handleLogout} />
      
      <main className="flex-1 p-8 overflow-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <PageComponent />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}