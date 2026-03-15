'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center px-6 md:px-16">
      <div className="mx-auto w-full max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 25, letterSpacing: '0.1em' }}
          animate={{ opacity: 1, y: 0, letterSpacing: '0.35em' }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="mb-4 text-xs uppercase text-secondary"
        >
          Amateur Radio Operator
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 1.05, ease: 'easeOut' }}
          className="font-heading text-6xl font-bold tracking-tight md:text-8xl"
        >
          S57AZJ
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-6 max-w-2xl text-lg text-secondary"
        >
          Experimenting with RF, antennas and software
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-10 space-y-2 text-sm text-secondary"
        >
          <p className="font-heading text-base text-primary">Aljaž Žugič Jehart</p>
          <p>Ljubljana, Slovenia</p>
          <p>Locator: JN76GB</p>
        </motion.div>
      </div>
    </section>
  );
}
