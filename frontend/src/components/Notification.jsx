import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotification } from '../hooks/useNotification';
import { FaCheckCircle, FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa';

const Notification = () => {
  const { notifications } = useNotification();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
      <AnimatePresence>
        {notifications.map(({ id, message, type }) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            className={`glass px-4 py-3 flex items-center space-x-3 border-l-4 ${
              type === 'success' ? 'border-primary-light text-white' : 
              type === 'error' ? 'border-red-500 text-white' : 'border-blue-400 text-white'
            }`}
            style={{ minWidth: '300px' }}
          >
            {type === 'success' && <FaCheckCircle className="text-primary-light text-xl" />}
            {type === 'info' && <FaInfoCircle className="text-blue-400 text-xl" />}
            {type === 'error' && <FaExclamationTriangle className="text-red-500 text-xl" />}
            
            <p className="text-sm font-medium">{message}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Notification;
