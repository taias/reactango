/**
 * User Details Component
 * Material UI design
 */
import { useForm } from '@/_fw/hooks';
import {
    ArrowBack as ArrowBackIcon,
    Cancel as CancelIcon,
    Edit as EditIcon,
    Person as PersonIcon,
    Save as SaveIcon,
} from '@mui/icons-material';
import {
    Alert,
    Avatar,
    Box,
    Button,
    Chip,
    CircularProgress,
    Divider,
    Paper,
    TextField,
    Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserDetails } from '../hooks/useUserDetails';

export function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading, error, updateUser } = useUserDetails(id);
  const { values, handleChange, setFieldValue } = useForm({
    name: '',
    email: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setFieldValue('name', user.name);
      setFieldValue('email', user.email);
    }
  }, [user, setFieldValue]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(values);
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update user:', err);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        エラーが発生しました: {error.message}
      </Alert>
    );
  }

  if (!user) {
    return (
      <Alert severity="warning">ユーザーが見つかりませんでした</Alert>
    );
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 1600, mx: 'auto', px: { xs: 2, sm: 3, md: 4, lg: 6 } }}>
      {/* Header */}
      <Box 
        sx={{ 
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
        }}
      >
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/users')}
          sx={{ 
            mb: 2,
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateX(-4px)',
            },
          }}
        >
          戻る
        </Button>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              sx={{
                width: 64,
                height: 64,
                bgcolor: 'primary.main',
                fontSize: 28,
                fontWeight: 700,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              {user.name.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="h4" fontWeight={700}>
                {user.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {user.email}
              </Typography>
            </Box>
          </Box>
          <Box>
            {!isEditing ? (
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => setIsEditing(true)}
                size="large"
                sx={{
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 12px rgba(102, 126, 234, 0.4)',
                  },
                }}
              >
                編集
              </Button>
            ) : (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleSubmit}
                  size="large"
                  sx={{
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 12px rgba(102, 126, 234, 0.4)',
                    },
                  }}
                >
                  保存
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<CancelIcon />}
                  onClick={() => setIsEditing(false)}
                  size="large"
                  sx={{
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  キャンセル
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      {/* User Info Card */}
      <Box sx={{ display: 'flex', gap: 3 }}>
        <Box sx={{ flex: '2 1 0', minWidth: 0 }}>
          <Paper 
            sx={{ 
              p: 4,
              animation: 'fadeInUp 0.5s ease-out 0.1s both',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.12)',
              },
            }}
          >
            <Typography variant="h6" gutterBottom fontWeight={600} sx={{ mb: 3 }}>
              基本情報
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box sx={{ display: 'flex', gap: 3 }}>
                <TextField
                  fullWidth
                  label="ユーザーID"
                  value={user.id}
                  disabled
                  variant="filled"
                  sx={{ flex: 1 }}
                />
                <TextField
                  fullWidth
                  label="名前"
                  name="name"
                  value={isEditing ? values.name : user.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  variant={isEditing ? 'outlined' : 'filled'}
                  sx={{ flex: 1 }}
                />
              </Box>
              <TextField
                fullWidth
                label="メールアドレス"
                name="email"
                value={isEditing ? values.email : user.email}
                onChange={handleChange}
                disabled={!isEditing}
                variant={isEditing ? 'outlined' : 'filled'}
                type="email"
              />
            </Box>
          </Paper>
        </Box>

        <Box sx={{ flex: '1 1 0', minWidth: 0 }}>
          <Paper 
            sx={{ 
              p: 3,
              animation: 'fadeInUp 0.5s ease-out 0.2s both',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.12)',
              },
            }}
          >
            <Typography variant="h6" gutterBottom fontWeight={600} sx={{ mb: 2 }}>
              統計情報
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  作成日時
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {user.created_at ? new Date(user.created_at).toLocaleDateString('ja-JP') : '-'}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  更新日時
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {user.updated_at ? new Date(user.updated_at).toLocaleDateString('ja-JP') : '-'}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  ユーザーID
                </Typography>
                <Chip
                  icon={<PersonIcon />}
                  label={`#${user.id}`}
                  color="primary"
                  sx={{ mt: 0.5 }}
                />
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
