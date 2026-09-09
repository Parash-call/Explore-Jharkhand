import React, { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    // Request Browser Notification permission on load
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const triggerNotification = ({ title, message, type = 'info' }) => {
    // 1. Show UI Toast
    setToast({ title, message, type, id: Date.now() });

    // 2. Trigger Browser Native Notification if allowed
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(`Explore Jharkhand: ${title}`, {
          body: message,
          icon: '/vite.svg'
        });
      } catch (err) {
        console.warn('Native notification failed:', err);
      }
    }
  };

  const closeToast = () => setToast(null);

  return (
    <NotificationContext.Provider value={{ toast, triggerNotification, closeToast }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
