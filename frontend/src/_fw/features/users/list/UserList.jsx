/**
 * User List Component
 * Material UI design
 */
import {
  Add as AddIcon,
  Email as EmailIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import {
  Alert,
  Box,
  Chip,
  Typography
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  DataTable,
  FormDialog,
  LoadingSpinner,
  PageContainer,
  PageHeader,
  PrimaryButton,
  TextField
} from '../../../components';
import { useUsers } from '../hooks/useUsers';

export function UserList() {
  const navigate = useNavigate();
  const { users, loading, error, createUser, creating } = useUsers();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleSubmit = async () => {
    try {
      await createUser(formData);
      setFormData({ name: '', email: '' });
      setShowForm(false);
    } catch (err) {
      console.error('Failed to create user:', err);
    }
  };

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        エラーが発生しました: {error.message}
      </Alert>
    );
  }

  const columns = [
    { 
      field: 'id', 
      label: 'ID', 
      width: '10%',
      render: (value) => <Chip label={`#${value}`} size="small" variant="outlined" />
    },
    { 
      field: 'name', 
      label: '名前', 
      width: '30%',
      render: (value) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <PersonIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
          <Typography fontWeight={600}>{value}</Typography>
        </Box>
      )
    },
    { 
      field: 'email', 
      label: 'メール', 
      width: '40%',
      render: (value) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <EmailIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
          <Typography noWrap>{value}</Typography>
        </Box>
      )
    },
    { 
      field: 'created_at', 
      label: '作成日時', 
      width: '20%',
      render: (value) => (
        <Typography variant="body2" color="text.secondary">
          {value ? new Date(value).toLocaleDateString('ja-JP') : '-'}
        </Typography>
      )
    },
  ];

  return (
    <PageContainer>
      <PageHeader
        title="ユーザー管理"
        description="登録されているユーザーの一覧と管理"
        action={
          <PrimaryButton
            startIcon={<AddIcon />}
            size="large"
            onClick={() => setShowForm(true)}
          >
            新規登録
          </PrimaryButton>
        }
      />

      {/* Stats */}
      <Box 
        sx={{ 
          mb: 4,
          animation: 'fadeInUp 0.5s ease-out 0.1s both',
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
        }}
      >
        <Card 
          sx={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: 2,
          }}
          hover
        >
          <PersonIcon sx={{ fontSize: 40, color: 'primary.main' }} />
          <Box>
            <Typography variant="h4" fontWeight={700}>
              {users.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              登録ユーザー数
            </Typography>
          </Box>
        </Card>
      </Box>

      {/* Table */}
      <Box sx={{ animation: 'fadeInUp 0.5s ease-out 0.2s both' }}>
        <DataTable
          columns={columns}
          data={users}
          onRowClick={(row) => navigate(`/users/${row.id}`)}
          emptyMessage="ユーザーが登録されていません"
        />
      </Box>

      {/* Create User Dialog */}
      <FormDialog
        open={showForm}
        onClose={() => setShowForm(false)}
        title="新規ユーザー作成"
        onSubmit={handleSubmit}
        submitLabel="作成"
        submitting={creating}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <TextField
            label="名前"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <TextField
            label="メールアドレス"
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </Box>
      </FormDialog>
    </PageContainer>
  );
}
