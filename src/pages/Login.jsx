import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
    } catch (err) {
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-8">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md"
      >
        <div className="bg-slate-800 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-emerald-400 mb-2">نظام ERP</h1>
            <p className="text-slate-400">تسجيل الدخول</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-500/20 border border-red-500 text-red-400 p-3 rounded-lg text-center"
              >
                {error}
              </motion.div>
            )}

            <div>
              <label className="text-slate-400 text-sm mb-2 block">البريد الإلكتروني</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                placeholder="admin@erp.com"
              />
            </div>

            <div>
              <label className="text-slate-400 text-sm mb-2 block">كلمة المرور</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                placeholder="••••••••"
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-emerald-500 text-white py-4 rounded-lg font-bold disabled:opacity-50"
            >
              {loading ? 'جاري التحميل...' : 'تسجيل الدخول'}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/signup" className="text-slate-400 hover:text-emerald-400 transition-colors">
              ليس لديك حساب؟ <span className="text-emerald-400">سجل الآن</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}