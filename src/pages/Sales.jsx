import React from 'react'
import { motion } from 'framer-motion'

const salesData = [
  { day: 'السبت', amount: 1200 },
  { day: 'الأحد', amount: 1800 },
  { day: 'الاثنين', amount: 2400 },
  { day: 'الثلاثاء', amount: 1600 },
  { day: 'الأربعاء', amount: 2200 },
  { day: 'الخميس', amount: 2800 },
  { day: 'الجمعة', amount: 1900 },
]

const topProducts = [
  { name: 'لابتوب Dell XPS 15', sales: '4,500', units: 12 },
  { name: 'شاشة LG 27"', sales: '2,400', units: 8 },
  { name: 'سماعة Sony WH-1000XM4', sales: '1,800', units: 6 },
]

export default function Sales() {
  const maxAmount = Math.max(...salesData.map(d => d.amount))

  return (
    <div className="space-y-8">
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-3xl font-bold text-white mb-8"
      >
        المبيعات
      </motion.h1>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-slate-800 rounded-xl p-6"
      >
        <h2 className="text-xl font-bold text-white mb-6">المبيعات الأسبوعية</h2>
        <div className="flex items-end gap-4 h-64">
          {salesData.map((day, index) => (
            <motion.div
              key={day.day}
              initial={{ height: 0 }}
              animate={{ height: (day.amount / maxAmount) * 200 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex-1 flex flex-col items-center gap-2"
            >
              <div className="w-full bg-emerald-500 rounded-t-lg" />
              <span className="text-slate-400 text-sm">{day.day}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-slate-800 rounded-xl p-6"
      >
        <h2 className="text-xl font-bold text-white mb-6">أفضل المنتجات</h2>
        <div className="space-y-4">
          {topProducts.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="flex items-center justify-between p-4 bg-slate-700 rounded-lg"
            >
              <div>
                <p className="text-white font-medium">{product.name}</p>
                <p className="text-slate-400 text-sm">{product.units} وحدة</p>
              </div>
              <span className="text-emerald-400 font-bold text-xl">{product.sales}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}