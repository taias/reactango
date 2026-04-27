import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem,
  Box, Typography, IconButton,
} from '@mui/material';
import { Close as CloseIcon, Add as AddIcon } from '@mui/icons-material';
import { useState } from 'react';

interface TaskDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
}

export function TaskDialog({ open, onClose, onSubmit }: TaskDialogProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('MEDIUM');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) return;
    setSubmitting(true);
    try {
      await onSubmit({ title, description: description || null, priority });
      setTitle('');
      setDescription('');
      setPriority('MEDIUM');
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: 'hidden',
        },
      }}
    >
      {/* Gradient Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          px: 3,
          py: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6" fontWeight={700} color="white">
          新規タスクの作成
        </Typography>
        <IconButton onClick={onClose} sx={{ color: 'rgba(255,255,255,0.8)' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent sx={{ px: 3, pt: 3 }} onKeyDown={handleKeyDown}>
        <TextField
          autoFocus
          label="タイトル"
          fullWidth
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="例: API仕様書を作成する"
          sx={{ mb: 2.5 }}
          InputProps={{
            sx: { borderRadius: 2 },
          }}
        />
        <TextField
          label="説明（任意）"
          fullWidth
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="タスクの詳細を記入..."
          sx={{ mb: 2.5 }}
          InputProps={{
            sx: { borderRadius: 2 },
          }}
        />
        <TextField
          select
          label="優先度"
          fullWidth
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          InputProps={{
            sx: { borderRadius: 2 },
          }}
        >
          <MenuItem value="HIGH">
            <Box display="flex" alignItems="center" gap={1}>
              <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#ef4444' }} />
              高 (High)
            </Box>
          </MenuItem>
          <MenuItem value="MEDIUM">
            <Box display="flex" alignItems="center" gap={1}>
              <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#f59e0b' }} />
              中 (Medium)
            </Box>
          </MenuItem>
          <MenuItem value="LOW">
            <Box display="flex" alignItems="center" gap={1}>
              <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#3b82f6' }} />
              低 (Low)
            </Box>
          </MenuItem>
        </TextField>
        <Typography variant="caption" color="text.disabled" sx={{ mt: 1.5, display: 'block' }}>
          Ctrl+Enter で送信
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={onClose}
          color="inherit"
          disabled={submitting}
          sx={{ borderRadius: 2 }}
        >
          キャンセル
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!title.trim() || submitting}
          startIcon={<AddIcon />}
          sx={{
            borderRadius: 2,
            px: 3,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontWeight: 700,
            '&:hover': {
              boxShadow: '0 4px 14px rgba(102, 126, 234, 0.4)',
            },
          }}
        >
          作成する
        </Button>
      </DialogActions>
    </Dialog>
  );
}
