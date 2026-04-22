import React from 'react'
import { motion } from 'framer-motion'

const menuItems = [
  { id: 'dashboard', label: 'الرئيسية', icon: '📊' },
  { id: 'products', label: 'المنتجات', icon: '📦' },
  { id: 'sales', label: 'المبيعات', icon: '💰' },
  { id: 'settings', label: 'الإعدادات', icon: '⚙️' },
]

export default function Sidebar({ activePage, onNavigate, onLogout }) {
  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 bg-slate-800 min-h-screen p-6 flex flex-col"
    >
      <div className="mb-10 text-center">
        <motion.h1
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold text-emerald-400"
        >
          نظام ERP
        </motion.h1>
        <p className="text-slate-400 text-sm mt-1">لوحة التحكم</p>
      </div>

      <nav className="flex-1 space-y-3">
        {menuItems.map((item, index) => (
          <motion.button
            key={item.id}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ x: 10 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate(item.id)}
            className={`w-full text-right px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
              activePage === item.id
                ? 'bg-emerald-500 text-white'
                : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </motion.button>
        ))}
      </nav>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="pt-6 border-t border-slate-700 space-y-3"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold">
            م
          </div>
          <div>
            <p className="text-slate-200 font-medium text-sm">مستخدم</p>
            <p className="text-slate-400 text-xs">admin@erp.com</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onLogout}
          className="w-full bg-slate-700 text-red-400 py-2 rounded-lg text-sm hover:bg-slate-600"
        >
          تسجيل الخروج
        </motion.button>
      </motion.div>
    </motion.aside>
  )
}