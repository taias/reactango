/**
 * PageContainer Component
 * ページ全体のコンテナコンポーネント
 */
import { Box } from '@mui/material';

export function PageContainer({ 
  children,
  maxWidth = 1600,
  padding = true,
  sx = {},
  ...props 
}) {
  return (
    <Box 
      sx={{ 
        width: '100%', 
        maxWidth, 
        mx: 'auto',
        ...(padding && {
          px: { xs: 2, sm: 3, md: 4, lg: 6 },
        }),
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}
