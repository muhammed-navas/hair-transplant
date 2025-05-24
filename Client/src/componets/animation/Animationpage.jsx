import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const pageVariants = {
  initial: {
    opacity: 0,
    x: '100%',
  },
  enter: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: '-100%',
  },
};

export const PageTransition = ({ children }) => {
  const location = useLocation();

  return (
    <motion.div
      key={location.key}
      initial="initial"
      animate="enter"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.1}}
    >
      {children}
    </motion.div>
  );
};


