import {
  Box, CardContent, Typography, Chip, IconButton, Menu, MenuItem,
  ListItemIcon, ListItemText, Divider, AvatarGroup, Avatar, Tooltip,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  ArrowBack as BackIcon,
  ArrowForward as ForwardIcon,
  CheckCircle as DoneIcon,
  Schedule as ScheduleIcon,
  Flag as FlagIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import { Card } from '../../../components';
import { Task } from '../../../api/tasks';

interface TaskCardProps {
  task: Task;
  onStatusChange: (taskId: number, newStatus: string) => void;
}

const priorityConfig = {
  HIGH: { label: '高', color: '#ef4444', bg: '#fef2f2' },
  MEDIUM: { label: '中', color: '#f59e0b', bg: '#fffbeb' },
  LOW: { label: '低', color: '#3b82f6', bg: '#eff6ff' },
} as const;

const statusFlow = {
  NOT_STARTED: { prev: null, next: 'IN_PROGRESS', nextLabel: '着手する', nextIcon: <ForwardIcon fontSize="small" /> },
  IN_PROGRESS: { prev: 'NOT_STARTED', next: 'COMPLETED', prevLabel: '未着手に戻す', nextLabel: '完了にする', prevIcon: <BackIcon fontSize="small" />, nextIcon: <DoneIcon fontSize="small" /> },
  COMPLETED: { prev: 'IN_PROGRESS', next: null, prevLabel: '進行中に戻す', prevIcon: <BackIcon fontSize="small" /> },
} as const;

export function TaskCard({ task, onStatusChange }: TaskCardProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const prio = priorityConfig[task.priority] || priorityConfig.MEDIUM;
  const flow = statusFlow[task.status] || statusFlow.NOT_STARTED;

  return (
    <Card
      sx={{ mb: 1.5, p: 0 }}
      hover
    >
      <CardContent sx={{ p: 2, pb: '14px !important' }}>
        {/* Header: Title + Menu */}
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={0.5}>
          <Typography
            variant="subtitle2"
            fontWeight={700}
            sx={{ wordBreak: 'break-word', pr: 1, lineHeight: 1.4, fontSize: '0.875rem' }}
          >
            {task.title}
          </Typography>
          <IconButton
            size="small"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{ mt: -0.5, mr: -0.5, opacity: 0.5, '&:hover': { opacity: 1 } }}
          >
            <MoreVertIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>

        {/* Description */}
        {task.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 1.5,
              fontSize: '0.8rem',
              lineHeight: 1.5,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {task.description}
          </Typography>
        )}

        {/* Footer: Priority + Due Date + Assignees */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
          <Chip
            label={prio.label}
            size="small"
            icon={<FlagIcon sx={{ fontSize: 14, color: prio.color + ' !important' }} />}
            sx={{
              fontWeight: 700,
              fontSize: '0.7rem',
              height: 22,
              bgcolor: prio.bg,
              color: prio.color,
              border: `1px solid ${prio.color}22`,
              '& .MuiChip-icon': { ml: '4px' },
            }}
          />

          <Box display="flex" alignItems="center" gap={1}>
            {task.due_date && (
              <Tooltip title={`期限: ${new Date(task.due_date).toLocaleDateString('ja-JP')}`}>
                <Box display="flex" alignItems="center" gap={0.3}>
                  <ScheduleIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
                  <Typography variant="caption" color="text.secondary" fontSize="0.7rem">
                    {new Date(task.due_date).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })}
                  </Typography>
                </Box>
              </Tooltip>
            )}
            {task.assigned_users.length > 0 && (
              <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 22, height: 22, fontSize: '0.65rem' } }}>
                {task.assigned_users.map((u: any) => (
                  <Tooltip key={u.id} title={u.name}>
                    <Avatar sx={{ bgcolor: '#667eea' }}>{u.name?.[0]}</Avatar>
                  </Tooltip>
                ))}
              </AvatarGroup>
            )}
          </Box>
        </Box>

        {/* Status Change Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          PaperProps={{
            elevation: 8,
            sx: {
              borderRadius: 2,
              minWidth: 180,
              '& .MuiMenuItem-root': { borderRadius: 1, mx: 0.5, my: 0.25 },
            },
          }}
        >
          {flow.prev && (
            <MenuItem onClick={() => { onStatusChange(task.id, flow.prev as string); setAnchorEl(null); }}>
              <ListItemIcon>{(flow as any).prevIcon}</ListItemIcon>
              <ListItemText>{(flow as any).prevLabel}</ListItemText>
            </MenuItem>
          )}
          {flow.prev && flow.next && <Divider />}
          {flow.next && (
            <MenuItem onClick={() => { onStatusChange(task.id, flow.next as string); setAnchorEl(null); }}>
              <ListItemIcon>{(flow as any).nextIcon}</ListItemIcon>
              <ListItemText>{(flow as any).nextLabel}</ListItemText>
            </MenuItem>
          )}
        </Menu>
      </CardContent>
    </Card>
  );
}
