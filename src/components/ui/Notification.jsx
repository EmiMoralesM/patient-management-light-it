import { useEffect } from 'react';
import { Icons } from '../Icons';

export const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, []);

  const Icon = type === 'success' ? Icons.Check : Icons.Alert;

  return (
    <div className={`notification ${type === 'success' ? 'notification-success' : 'notification-error'}`}>
      <Icon />
      <span>{message}</span>
      <button onClick={onClose} className="notification-close">
        <Icons.Close />
      </button>
    </div>
  );
};


