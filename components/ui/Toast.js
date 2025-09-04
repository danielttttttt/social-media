import { useEffect } from 'react';

export default function Toast({ type = 'success', message, onClose, duration = 2500 }) {
  useEffect(() => {
    if (!message) return;
    const id = setTimeout(() => onClose && onClose(), duration);
    return () => clearTimeout(id);
  }, [message, onClose, duration]);

  if (!message) return null;

  return (
    <div className="fixed top-4 right-4 z-[100]">
      <div className={`px-4 py-3 rounded-md shadow-md border ${
        type === 'success'
          ? 'bg-green-50 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800'
          : 'bg-red-50 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800'
      }`}>
        {message}
      </div>
    </div>
  );
}

