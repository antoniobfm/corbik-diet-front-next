import React, { useEffect } from 'react';
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from 'react-icons/fi';
import { Container } from '@/styles/components/ToastContainer/Toast';

import { ToastMessage, useToast } from '../../hooks/toast';
import { AnimatePresence } from 'framer-motion';

interface ToastProps {
  message: ToastMessage;
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />,
};

const Toast: React.FC<ToastProps> = ({ message }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, message.id]);

  return (
      <Container
        type={message.type}
        hasDescription={Number(!!message.description)}
        initial={{ bottom: '-100%', opacity: 0 }}
        animate={{ bottom: '0%', opacity: 1 }}
        exit={{ bottom: '-100%', opacity: 0 }}
				onClick={() => removeToast(message.id)}
      >
        {/* {icons[message.type || 'info']} */}

        <div>
          <strong>{message.title}</strong>
          {message.description && <p>{message.description}</p>}
        </div>

        {/* <button onClick={() => removeToast(message.id)} type="button">
				<FiXCircle size={18} />
			</button> */}
      </Container>
  );
};

export default Toast;
