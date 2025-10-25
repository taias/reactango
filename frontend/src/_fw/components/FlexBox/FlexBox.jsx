/**
 * FlexBox Component
 * Flexboxレイアウト用コンポーネント
 */
import { Box } from '@mui/material';

export function FlexBox({ 
  children,
  direction = 'row',
  justify = 'flex-start',
  align = 'stretch',
  gap = 2,
  wrap = 'nowrap',
  sx = {},
  ...props 
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: direction,
        justifyContent: justify,
        alignItems: align,
        gap,
        flexWrap: wrap,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}
