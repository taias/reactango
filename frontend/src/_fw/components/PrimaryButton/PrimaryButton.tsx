/**
 * PrimaryButton Component
 * プライマリボタンコンポーネント（Material UI拡張）
 */
import { Button } from '@mui/material';

export function PrimaryButton({ 
  children,
  onClick,
  disabled = false,
  loading = false,
  variant = 'contained',
  size = 'medium',
  fullWidth = false,
  startIcon,
  endIcon,
  sx = {},
  ...props 
}) {
  return (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled || loading}
      fullWidth={fullWidth}
      startIcon={startIcon}
      endIcon={endIcon}
      sx={{
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: variant === 'contained' 
            ? '0 6px 12px rgba(102, 126, 234, 0.4)'
            : '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
        ...sx,
      }}
      {...props}
    >
      {loading ? '処理中...' : children}
    </Button>
  );
}
