import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

// Custom styled toast notifications
const createToast = (type, message, options = {}) => {
  const icons = {
    success: (
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", bounce: 0.5 }}
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #00b09b, #00d2ff)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 15px rgba(0, 176, 155, 0.4)',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </motion.div>
    ),
    error: (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #ff416c, #ff4b2b)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 15px rgba(255, 75, 43, 0.4)',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </motion.div>
    ),
    loading: (
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '3px solid rgba(0, 210, 255, 0.2)',
          borderTopColor: '#00d2ff',
        }}
      />
    ),
    info: (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #3a7bd5, #00d2ff)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 15px rgba(58, 123, 213, 0.4)',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      </motion.div>
    ),
  };

  const baseStyle = {
    background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.95), rgba(15, 12, 41, 0.98))',
    color: '#fff',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    padding: '16px 20px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    minWidth: '300px',
    maxWidth: '400px',
  };

  const borderColors = {
    success: 'rgba(0, 176, 155, 0.5)',
    error: 'rgba(255, 75, 43, 0.5)',
    loading: 'rgba(0, 210, 255, 0.5)',
    info: 'rgba(58, 123, 213, 0.5)',
  };

  return toast.custom(
    (t) => (
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ 
          opacity: t.visible ? 1 : 0, 
          y: t.visible ? 0 : 50,
          scale: t.visible ? 1 : 0.9,
        }}
        transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
        style={{
          ...baseStyle,
          borderLeft: `4px solid ${borderColors[type]}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {icons[type]}
          <div style={{ flex: 1 }}>
            <p style={{ 
              margin: 0, 
              fontSize: '0.95rem', 
              fontWeight: 500,
              lineHeight: 1.5,
            }}>
              {message}
            </p>
          </div>
          {type !== 'loading' && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => toast.dismiss(t.id)}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '8px',
                width: 28,
                height: 28,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255, 255, 255, 0.6)',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </motion.button>
          )}
        </div>
      </motion.div>
    ),
    {
      duration: type === 'loading' ? Infinity : 4000,
      ...options,
    }
  );
};

// Export custom toast functions
export const customToast = {
  success: (message, options) => createToast('success', message, options),
  error: (message, options) => createToast('error', message, options),
  loading: (message, options) => createToast('loading', message, options),
  info: (message, options) => createToast('info', message, options),
  dismiss: toast.dismiss,
  // For updating existing toasts
  update: (id, type, message) => {
    toast.dismiss(id);
    return createToast(type, message);
  },
};

export default customToast;
