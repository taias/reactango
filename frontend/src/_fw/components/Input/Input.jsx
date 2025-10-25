/**
 * Input Component
 * 汎用入力コンポーネント
 */
import React from 'react';
import './Input.css';

export function Input({
  type = 'text',
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  label,
  required = false,
  disabled = false,
  ...props
}) {
  return (
    <div className="input-group">
      {label && (
        <label htmlFor={name} className="input-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        className={`input ${error ? 'input-error' : ''}`}
        {...props}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}
