/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect } from 'react';

import { FiXCircle, FiCheckCircle, FiInfo } from 'react-icons/fi';
import { toastMessage, useToast } from '../../../hooks/Toast';

import { Container } from './styles';

interface ToastProps {
  message: toastMessage;
  style: object;
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiXCircle size={24} />,
  success: <FiCheckCircle size={24} />,
};

const Toast: React.FC<ToastProps> = ({ message, style }) => {
  const { rmvToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      rmvToast(message.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [rmvToast, message.id]);

  return (
    <Container
      type={message.type}
      hasDescription={Number(!!message.description)}
      style={style}
    >
      {icons[message.type || 'info']}

      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button type="button" onClick={() => rmvToast(message.id)}>
        <FiXCircle size={20} />
      </button>
    </Container>
  );
};

export default Toast;
