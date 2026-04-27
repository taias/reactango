/**
 * DataTable Component
 * 汎用データテーブルコンポーネント
 */
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';

export function DataTable({ 
  columns,
  data,
  onRowClick,
  emptyMessage = 'データがありません',
  hover = true,
  sx = {},
  ...props 
}) {
  return (
    <TableContainer 
      component={Paper} 
      sx={{ 
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        overflow: 'hidden',
        ...sx,
      }}
      {...props}
    >
      <Table sx={{ tableLayout: 'fixed', width: '100%' }}>
        <TableHead>
          <TableRow sx={{ bgcolor: 'primary.main' }}>
            {columns.map((column, index) => (
              <TableCell
                key={index}
                align={column.align || 'left'}
                sx={{
                  color: 'white',
                  fontWeight: 700,
                  width: column.width || 'auto',
                }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} align="center" sx={{ py: 8 }}>
                <Typography color="text.secondary">
                  {emptyMessage}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                hover={hover}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                sx={{
                  cursor: onRowClick ? 'pointer' : 'default',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  ...(hover && onRowClick && {
                    '&:hover': {
                      bgcolor: 'action.hover',
                      transform: 'scale(1.002)',
                    },
                  }),
                }}
              >
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex} align={column.align || 'left'}>
                    {column.render 
                      ? column.render(row[column.field], row, rowIndex)
                      : row[column.field]
                    }
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
