'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
  title?: string;
}

interface ToastContextType {
  toasts: ToastItem[];
  showToast: (message: string, type?: ToastType, title?: string) => void;
  success: (message: string, title?: string) => void;
  error: (message: string, title?: string) => void;
  info: (message: string, title?: string) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message: string, type: ToastType = 'info', title?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message, title }]);

    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }, [removeToast]);

  const success = useCallback((message: string, title?: string) => showToast(message, 'success', title), [showToast]);
  const error = useCallback((message: string, title?: string) => showToast(message, 'error', title), [showToast]);
  const info = useCallback((message: string, title?: string) => showToast(message, 'info', title), [showToast]);

  return (
    <ToastContext.Provider value={{ toasts, showToast, success, error, info, removeToast }}>
      {children}
      <div
        aria-live="polite"
        className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-lg text-xs transition-all duration-300 transform translate-y-0 animate-in slide-in-from-bottom-3 ${
              t.type === 'success'
                ? 'bg-white border-emerald-300 text-stone-900 ring-1 ring-emerald-500/20'
                : t.type === 'error'
                ? 'bg-white border-rose-300 text-stone-900 ring-1 ring-rose-500/20'
                : 'bg-white border-amber-300 text-stone-900 ring-1 ring-amber-500/20'
            }`}
          >
            <span className="text-base leading-none">
              {t.type === 'success' ? '✅' : t.type === 'error' ? '⚠️' : 'ℹ️'}
            </span>
            <div className="flex-1">
              {t.title && <p className="font-bold text-stone-900 text-xs mb-0.5">{t.title}</p>}
              <p className="text-stone-700 leading-relaxed">{t.message}</p>
            </div>
            <button
              type="button"
              onClick={() => removeToast(t.id)}
              className="text-stone-400 hover:text-stone-700 text-xs font-bold leading-none p-1"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
