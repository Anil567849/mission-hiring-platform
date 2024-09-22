'use client'

import { motion } from 'framer-motion'

export default function Loader() {
  return (
    <div className="inset-0 flex items-center justify-center bg-gray-900">
      <div className="relative flex flex-col items-center">
        <motion.div
          className="w-32 h-32 border-4 border-blue-500 rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute w-24 h-24 border-t-4 border-blue-300 rounded-full"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute w-16 h-16 bg-blue-500 rounded-full"
          animate={{
            scale: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.p
          className="mt-8 text-xl font-semibold text-blue-300"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Loading...
        </motion.p>
      </div>
    </div>
  )
}