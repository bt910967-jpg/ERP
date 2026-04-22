import React from 'react'
import { motion } from 'framer-motion'

const stats = [
  { label: 'إجمالي المبيعات', value: '125,600', change: '+12%', icon: '💵', color: 'text-emerald-400' },
  { label: 'عدد المنتجات', value: '1,248', change: '+5%', icon: '📦', color: 'text-blue-400' },
  { label: 'العملاء النشطين', value: '842', change: '+8%', icon: '👥', color: 'text-purple-400' },
  { label: 'طلبات اليوم', value: '156', change: '+23%', icon: '🛒', color: 'text-amber-400' },
]

const recentOrders = [
  { id: 1, customer: 'أحمد محمد', product: 'لابتوب Dell', amount: '4,500', status: 'مكتمل' },
  { id: 2, customer: 'سارة علي', product: 'طابعة HP', amount: '800', status: 'قيد التنفيذ' },
  { id: 3, customer: 'خالد سعيد', product: 'شاشة LG', amount: '1,200', status: 'مكتمل' },
  { id: 4, customer: 'فاطمة أحمد', product: 'كيبورد', amount: '150', status: 'قيد التنفيذ' },
]

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-3xl font-bold text-white mb-8"
      >
        لوحة التحكم
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-slate-800 p-6 rounded-xl"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-3xl">{stat.icon}</span>
              <span className={`text-sm font-medium ${stat.color}`}>{stat.change}</span>
            </div>
            <h3 className="text-slate-400 text-sm mb-1">{stat.label}</h3>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-slate-800 rounded-xl p-6"
      >
        <h2 className="text-xl font-bold text-white mb-6">أحدث الطلبات</h2>
        <div className="space-y-4">
          {recentOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="flex items-center justify-between p-4 bg-slate-700 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold">
                  {order.customer[0]}
                </div>
                <div>
                  <p className="text-white font-medium">{order.customer}</p>
                  <p className="text-slate-400 text-sm">{order.product}</p>
                </div>
              </div>
              <div className="text-left">
                <p className="text-white font-bold">{order.amount}</p>
                <p className={`text-sm ${
                  order.status === 'مكتمل' ? 'text-emerald-400' : 'text-amber-400'
                }`}>
                  {order.status}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}