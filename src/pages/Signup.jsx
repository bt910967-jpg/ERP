import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Signup() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (password !== confirmPassword) {
      setError('كلمات المرور غير متطابقة')
      return
    }
    
    if (password.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل')
      return
    }

    setLoading(true)
    try {
      await signup(email, password)
      setSuccess(true)
    } catch (err) {
      setError('حدث خطأ أثناء التسجيل. قد يكون البريد الإلكتروني مستخدم مسبقاً')
    }
    setLoading(false)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-slate-800 rounded-2xl p-8 shadow-2xl text-center max-w-md"
        >
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-white mb-4">تم التسجيل بنجاح!</h2>
          <p className="text-slate-400 mb-6">تم إرسال رابط التأكيد إلى بريدك الإلكتروني</p>
          <Link to="/login" className="text-emerald-400 hover:text-emerald-300">
            العودة لتسجيل الدخول
          </Link>
        </motion.div>
      </div>
    )
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
            <h1 className="text-3xl font-bold text-emerald-400 mb-2">إنشاء حساب جديد</h1>
            <p className="text-slate-400">ادخل بياناتك للتسجيل</p>
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
                placeholder="6 أحرف على الأقل"
              />
            </div>

            <div>
              <label className="text-slate-400 text-sm mb-2 block">تأكيد كلمة المرور</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                placeholder="أعد إدخال كلمة المرور"
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-emerald-500 text-white py-4 rounded-lg font-bold disabled:opacity-50"
            >
              {loading ? 'جاري التسجيل...' : 'إنشاء حساب'}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/login" className="text-slate-400 hover:text-emerald-400 transition-colors">
              لديك حساب؟ <span className="text-emerald-400">سجل دخول</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}