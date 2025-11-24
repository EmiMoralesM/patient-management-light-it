import { useEffect } from 'react';
import { Icons } from '../Icons';

export const Modal = ({ isOpen, onClose, children, title }) => {
  useEffect(() => { 
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => document.body.style.overflow = 'unset';
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="modal-content">
        <div className="modal-header">
          <h2>{title}</h2>
          <button onClick={onClose} className="modal-close-btn">
            <Icons.Close />
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};


