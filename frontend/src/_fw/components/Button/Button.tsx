/**
 * Button Component
 * 汎用ボタンコンポーネント
 */
import React from 'react';
import './Button.css';

export function Button({ 
  children, 
  type = 'button', 
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  ...props 
}) {
  const className = `btn btn-${variant} btn-${size}`;
  
  return (
    <button
      type={type}
      className={className}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
