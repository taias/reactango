import { Box, Typography, Paper, Alert, Chip, Fade } from '@mui/material';
import {
  Add as AddIcon,
  PlaylistAddCheck as TodoIcon,
  Sync as InProgressIcon,
  CheckCircle as DoneIcon,
  Assignment as TaskIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import {
  PageContainer,
  PageHeader,
  PrimaryButton,
  LoadingSpinner,
  Card,
  FormDialog,
  TextField,
} from '../../../components';
import { useTasks } from '../hooks/useTasks';
import { TaskCard } from './TaskCard';

const columns = [
  {
    id: 'NOT_STARTED',
    title: '未着手',
    subtitle: 'To Do',
    icon: <TodoIcon sx={{ fontSize: 20 }} />,
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    bgTint: 'rgba(102, 126, 234, 0.04)',
    headerBg: 'linear-gradient(135deg, #667eea18 0%, #764ba218 100%)',
    borderAccent: '#667eea',
  },
  {
    id: 'IN_PROGRESS',
    title: '進行中',
    subtitle: 'In Progress',
    icon: <InProgressIcon sx={{ fontSize: 20 }} />,
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    bgTint: 'rgba(245, 87, 108, 0.04)',
    headerBg: 'linear-gradient(135deg, #f093fb18 0%, #f5576c18 100%)',
    borderAccent: '#f5576c',
  },
  {
    id: 'COMPLETED',
    title: '完了',
    subtitle: 'Done',
    icon: <DoneIcon sx={{ fontSize: 20 }} />,
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    bgTint: 'rgba(79, 172, 254, 0.04)',
    headerBg: 'linear-gradient(135deg, #4facfe18 0%, #00f2fe18 100%)',
    borderAccent: '#4facfe',
  },
];

export function TaskBoard() {
  const { tasks, loading, error, addTask, changeStatus } = useTasks();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', priority: 'MEDIUM' });
  const [formError, setFormError] = useState('');
  const [creating, setCreating] = useState(false);

  const handleSubmit = async () => {
    try {
      setFormError('');
      setCreating(true);
      await addTask({ ...formData, description: formData.description || null });
      setFormData({ title: '', description: '', priority: 'MEDIUM' });
      setShowForm(false);
    } catch (err: any) {
      setFormError(err.message || 'タスクの作成に失敗しました');
    } finally {
      setCreating(false);
    }
  };

  if (loading && tasks.length === 0) return <LoadingSpinner />;

  return (
    <PageContainer>
      <PageHeader
        title="タスク管理"
        description={`${tasks.length} 件のタスク・${tasks.filter(t => t.status === 'COMPLETED').length} 件完了`}
        action={
          <PrimaryButton
            startIcon={<AddIcon />}
            size="large"
            onClick={() => setShowForm(true)}
          >
            新規タスク
          </PrimaryButton>
        }
      />

      {/* Stats */}
      <Box
        sx={{
          mb: 4,
          animation: 'fadeInUp 0.5s ease-out 0.1s both',
          '@keyframes fadeInUp': {
            from: { opacity: 0, transform: 'translateY(20px)' },
            to: { opacity: 1, transform: 'translateY(0)' },
          },
        }}
      >
        <Card sx={{ display: 'inline-flex', alignItems: 'center', gap: 2 }} hover>
          <TaskIcon sx={{ fontSize: 40, color: 'primary.main' }} />
          <Box>
            <Typography variant="h4" fontWeight={700}>
              {tasks.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              総タスク数
            </Typography>
          </Box>
        </Card>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Kanban Columns */}
      <Box
        sx={{
          display: 'flex',
          gap: 3,
          flexGrow: 1,
          overflowX: 'auto',
          pb: 3,
          animation: 'fadeInUp 0.5s ease-out 0.2s both',
          '&::-webkit-scrollbar': { height: 8 },
          '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(0,0,0,0.1)', borderRadius: 4 },
        }}
      >
        {columns.map((col, idx) => {
          const count = tasks.filter(t => t.status === col.id).length;
          return (
            <Fade in timeout={400 + idx * 200} key={col.id}>
              <Paper
                elevation={0}
                sx={{
                  minWidth: 340,
                  flex: 1,
                  bgcolor: col.bgTint,
                  border: '1px solid',
                  borderColor: 'rgba(0,0,0,0.08)',
                  borderRadius: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  maxHeight: 'calc(100vh - 340px)',
                  overflow: 'hidden',
                  transition: 'border-color 0.3s ease',
                  '&:hover': {
                    borderColor: col.borderAccent + '44',
                  },
                }}
              >
                {/* Column Header */}
                <Box
                  sx={{
                    p: 2,
                    px: 2.5,
                    background: col.headerBg,
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: 2,
                        background: col.gradient,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                      }}
                    >
                      {col.icon}
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" fontWeight={700} lineHeight={1.2}>
                        {col.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" lineHeight={1}>
                        {col.subtitle}
                      </Typography>
                    </Box>
                  </Box>
                  <Chip
                    size="small"
                    label={count}
                    sx={{
                      fontWeight: 700,
                      bgcolor: 'white',
                      border: '1px solid rgba(0,0,0,0.08)',
                      minWidth: 28,
                    }}
                  />
                </Box>

                {/* Column Body */}
                <Box
                  sx={{
                    p: 2,
                    flexGrow: 1,
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': { width: 5 },
                    '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(0,0,0,0.08)', borderRadius: 3 },
                  }}
                >
                  {tasks.filter(t => t.status === col.id).length === 0 && (
                    <Box
                      sx={{
                        py: 6,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        opacity: 0.4,
                      }}
                    >
                      {col.icon}
                      <Typography variant="caption" mt={1}>タスクなし</Typography>
                    </Box>
                  )}
                  {tasks.filter(t => t.status === col.id).map(task => (
                    <TaskCard key={task.id} task={task} onStatusChange={changeStatus} />
                  ))}
                </Box>
              </Paper>
            </Fade>
          );
        })}
      </Box>

      {/* Create Task Dialog - using FW FormDialog */}
      <FormDialog
        open={showForm}
        onClose={() => {
          setShowForm(false);
          setFormError('');
        }}
        title="新規タスク作成"
        onSubmit={handleSubmit}
        submitLabel="作成"
        submitting={creating}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          {formError && (
            <Alert severity="error" sx={{ mb: 1 }}>
              {formError}
            </Alert>
          )}
          <TextField
            label="タイトル"
            name="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            placeholder="例: API仕様書を作成する"
          />
          <TextField
            label="説明"
            name="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="タスクの詳細を記入..."
          />
        </Box>
      </FormDialog>
    </PageContainer>
  );
}
