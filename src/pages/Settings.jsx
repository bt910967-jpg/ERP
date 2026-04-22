import React from 'react'
import { motion } from 'framer-motion'

export default function Settings() {
  return (
    <div className="space-y-8">
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-3xl font-bold text-white mb-8"
      >
        الإعدادات
      </motion.h1>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-slate-800 rounded-xl p-6 space-y-6"
      >
        <h2 className="text-xl font-bold text-white border-b border-slate-700 pb-4">
          إعدادات المتجر
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-slate-400 text-sm mb-2 block">اسم المتجر</label>
            <input
              type="text"
              defaultValue="متجر التقنية"
              className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="text-slate-400 text-sm mb-2 block">البريد الإلكتروني</label>
            <input
              type="email"
              defaultValue="info@store.com"
              className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="text-slate-400 text-sm mb-2 block">رقم الهاتف</label>
            <input
              type="tel"
              defaultValue="+966 50 123 4567"
              className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="text-slate-400 text-sm mb-2 block">العملة</label>
            <select className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500">
              <option>ريال سعودي (SAR)</option>
              <option>دولار أمريكي (USD)</option>
              <option>يورو (EUR)</option>
            </select>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-800 rounded-xl p-6 space-y-6"
      >
        <h2 className="text-xl font-bold text-white border-b border-slate-700 pb-4">
          إعدادات الإشعارات
        </h2>
        
        <div className="space-y-4">
          {[
            { label: 'إشعارات الطلبات الجديدة', enabled: true },
            { label: 'تنبيهات المخزون المنخفض', enabled: true },
            { label: 'تقارير المبيعات اليومية', enabled: false },
          ].map((setting, index) => (
            <motion.div
              key={setting.label}
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-center justify-between p-4 bg-slate-700 rounded-lg"
            >
              <span className="text-white">{setting.label}</span>
              <motion.button
                whileTap={{ scale: 0.9 }}
                className={`w-14 h-8 rounded-full relative ${
                  setting.enabled ? 'bg-emerald-500' : 'bg-slate-600'
                }`}
              >
                <motion.div
                  animate={{ x: setting.enabled ? 24 : 4 }}
                  className="absolute top-1 w-6 h-6 bg-white rounded-full"
                />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-emerald-500 text-white py-4 rounded-lg font-bold"
      >
        حفظ التغييرات
      </motion.button>
    </div>
  )
}