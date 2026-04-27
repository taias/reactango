/**
 * Card Component
 * 汎用カードコンポーネント
 */
import { Paper } from '@mui/material';

export function Card({ 
  children, 
  elevation = 1,
  hover = false,
  sx = {},
  ...props 
}) {
  return (
    <Paper
      elevation={elevation}
      sx={{
        p: 3,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        ...(hover && {
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.12)',
          },
        }),
        ...sx,
      }}
      {...props}
    >
      {children}
    </Paper>
  );
}
