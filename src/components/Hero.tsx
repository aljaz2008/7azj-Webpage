'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center px-4 pt-16 md:px-16 md:pt-0">
      <div className="mx-auto w-full max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 25, letterSpacing: '0.1em' }}
          animate={{ opacity: 1, y: 0, letterSpacing: '0.3em' }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="mb-4 text-[10px] uppercase text-secondary sm:text-xs"
        >
          Amateur Radio Operator
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 1.05, ease: 'easeOut' }}
          className="font-heading text-5xl font-bold tracking-tight sm:text-6xl md:text-8xl"
        >
          S57AZJ
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-5 max-w-2xl text-base text-secondary sm:text-lg"
        >
          Experimenting with RF, antennas and software
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-8 space-y-2 text-sm text-secondary md:mt-10"
        >
          <p className="font-heading text-base text-primary">Aljaž Žugič Jehart</p>
          <p>Ljubljana, Slovenia</p>
          <p>Locator: JN76GB</p>
        </motion.div>
      </div>
    </section>
  );
}
