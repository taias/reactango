/**
 * UniformGrid Component
 * 均等幅のグリッドレイアウトコンポーネント
 */
import { Box } from '@mui/material';

export function UniformGrid({ 
  children,
  columns = 4,
  gap = 3,
  minWidth = 0,
  sx = {},
  ...props 
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap,
        flexWrap: 'wrap',
        ...sx,
      }}
      {...props}
    >
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <Box
            key={index}
            sx={{
              flex: '1 1 0',
              minWidth,
            }}
          >
            {child}
          </Box>
        ))
      ) : (
        <Box sx={{ flex: '1 1 0', minWidth }}>
          {children}
        </Box>
      )}
    </Box>
  );
}
