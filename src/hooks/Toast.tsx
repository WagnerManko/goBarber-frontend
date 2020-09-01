import React, { createContext, useContext, useCallback, useState } from 'react';

import { uuid } from 'uuidv4';

import ToastContainer from '../components/ToastContainer';

export interface toastMessage {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

interface toastContext {
  addToast(message: Omit<toastMessage, 'id'>): void;
  rmvToast(id: string): void;
}

const ToastContext = createContext<toastContext>({} as toastContext);

export const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<toastMessage[]>([]);

  const addToast = useCallback(
    ({ type, title, description }: Omit<toastMessage, 'id'>) => {
      const id = uuid();

      const toast = {
        id,
        type,
        title,
        description,
      };

      setMessages(state => [...state, toast]);
    },
    [],
  );
  const rmvToast = useCallback((id: string) => {
    setMessages(state => state.filter(message => message.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, rmvToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

export function useToast(): toastContext {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
}
