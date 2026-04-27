/**
 * PageHeader Component
 * ページヘッダーコンポーネント
 */
import { Box, Typography } from '@mui/material';

export function PageHeader({ 
  title,
  description,
  action,
  sx = {},
  ...props 
}) {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 4,
        animation: 'fadeInUp 0.5s ease-out',
        '@keyframes fadeInUp': {
          from: {
            opacity: 0,
            transform: 'translateY(20px)',
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
        ...sx,
      }}
      {...props}
    >
      <Box>
        <Typography variant="h4" gutterBottom fontWeight={700}>
          {title}
        </Typography>
        {description && (
          <Typography variant="body1" color="text.secondary">
            {description}
          </Typography>
        )}
      </Box>
      {action && <Box>{action}</Box>}
    </Box>
  );
}
