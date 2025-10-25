/**
 * LoadingSpinner Component
 * ローディングスピナーコンポーネント
 */
import { Box, CircularProgress } from '@mui/material';

export function LoadingSpinner({ 
  size = 60,
  minHeight = '400px',
  sx = {},
  ...props 
}) {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight,
        ...sx,
      }}
      {...props}
    >
      <CircularProgress size={size} />
    </Box>
  );
}
