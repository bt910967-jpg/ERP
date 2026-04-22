import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../supabase'

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ name: '', category: '', price: '', stock: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase.from('products').select('*')
      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error('Error fetching products:', error)
      setProducts([])
    }
    setLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const { error } = await supabase.from('products').insert([form])
      if (error) throw error
      await fetchProducts()
      setShowModal(false)
      setForm({ name: '', category: '', price: '', stock: '' })
    } catch (error) {
      console.error('Error adding product:', error)
      alert('حدث خطأ أثناء إضافة المنتج')
    }
    setSaving(false)
  }

  const handleDelete = async (id) => {
    if (!confirm('هل تريد حذف هذا المنتج؟')) return
    try {
      const { error } = await supabase.from('products').delete().eq('id', id)
      if (error) throw error
      await fetchProducts()
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-emerald-400 text-xl">جاري التحميل...</div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl font-bold text-white"
        >
          المنتجات
        </motion.h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowModal(true)}
          className="bg-emerald-500 text-white px-6 py-3 rounded-lg font-medium"
        >
          + إضافة منتج
        </motion.button>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-800 rounded-xl p-6 w-full max-w-md"
            >
              <h2 className="text-xl font-bold text-white mb-6">إضافة منتج جديد</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="اسم المنتج"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <input
                  type="text"
                  placeholder="الفئة"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  required
                  className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    placeholder="السعر"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    required
                    className="bg-slate-700 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <input
                    type="number"
                    placeholder="المخزون"
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                    required
                    className="bg-slate-700 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-slate-700 text-white py-3 rounded-lg"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 bg-emerald-500 text-white py-3 rounded-lg disabled:opacity-50"
                  >
                    {saving ? 'جاري الحفظ...' : 'حفظ'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-slate-800 rounded-xl p-6 relative"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleDelete(product.id)}
              className="absolute top-4 left-4 text-red-400 hover:text-red-300"
            >
              ✕
            </motion.button>
            <div className="w-full h-32 bg-slate-700 rounded-lg mb-4 flex items-center justify-center text-4xl">
              📦
            </div>
            <h3 className="text-white font-bold text-lg mb-1">{product.name}</h3>
            <p className="text-slate-400 text-sm mb-3">{product.category}</p>
            <div className="flex justify-between items-center">
              <span className="text-emerald-400 font-bold text-xl">{product.price} ر.س</span>
              <span className="text-slate-400 text-sm">المخزون: {product.stock}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          <div className="text-6xl mb-4">📦</div>
          <p>لا توجد منتجات. أضف منتجك الأول!</p>
        </div>
      )}
    </div>
  )
}