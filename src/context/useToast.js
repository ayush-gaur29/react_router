import { useContext } from 'react';
import { ToastContext } from './ToastContextDef';

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    return {
      showToast: (msg) => alert(msg),
      removeToast: () => {},
    };
  }
  return context;
};

