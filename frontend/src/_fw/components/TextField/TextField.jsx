/**
 * TextField Component
 * 汎用テキストフィールドコンポーネント（Material UI拡張）
 */
import { TextField as MuiTextField } from '@mui/material';

export function TextField({ 
  label,
  value,
  onChange,
  error,
  helperText,
  required = false,
  disabled = false,
  type = 'text',
  fullWidth = true,
  variant = 'outlined',
  size = 'medium',
  sx = {},
  ...props 
}) {
  return (
    <MuiTextField
      label={label}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      required={required}
      disabled={disabled}
      type={type}
      fullWidth={fullWidth}
      variant={variant}
      size={size}
      sx={{
        ...sx,
      }}
      {...props}
    />
  );
}
