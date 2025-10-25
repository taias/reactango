/**
 * FormDialog Component
 * フォーム用ダイアログコンポーネント
 */
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';

export function FormDialog({ 
  open,
  onClose,
  title,
  children,
  onSubmit,
  submitLabel = '保存',
  cancelLabel = 'キャンセル',
  submitting = false,
  maxWidth = 'sm',
  fullWidth = true,
  ...props 
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      TransitionProps={{
        timeout: 300,
      }}
      {...props}
    >
      <DialogTitle>{title}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={submitting}>
            {cancelLabel}
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={submitting}
            sx={{
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 8px rgba(102, 126, 234, 0.4)',
              },
            }}
          >
            {submitting ? '処理中...' : submitLabel}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
