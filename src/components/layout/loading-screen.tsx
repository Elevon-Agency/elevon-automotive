"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          aria-hidden={!isLoading}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="flex flex-col items-center gap-8"
          >
            <motion.div
              className="relative"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            >
              <svg
                viewBox="0 0 200 40"
                className="h-10 w-48 text-foreground"
                fill="currentColor"
                aria-label="Apex Motors"
              >
                <motion.path
                  d="M10 35 L50 5 L90 35 M50 5 L50 35 M110 35 L150 5 L190 35 M150 5 L150 35"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              </svg>
            </motion.div>
            <motion.p
              className="text-display text-xs tracking-[0.4em] uppercase text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              Apex Motors
            </motion.p>
          </motion.div>
          <motion.div
            className="absolute bottom-12 left-1/2 h-px -translate-x-1/2 bg-border"
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
