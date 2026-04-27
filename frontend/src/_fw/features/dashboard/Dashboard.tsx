/**
 * Dashboard Component
 * FW初期画面
 */
import {
  Api as ApiIcon,
  Build as BuildIcon,
  Cloud as CloudIcon,
  Code as CodeIcon,
  Layers as LayersIcon,
  OpenInNew as OpenInNewIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Storage as StorageIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import {
  Box,
  Chip,
  Grid,
  Typography,
} from '@mui/material';
import {
  Card,
  PageContainer,
  PrimaryButton,
  UniformGrid,
} from '../../components';

export function Dashboard() {
  const features = [
    {
      icon: <SpeedIcon sx={{ fontSize: 40 }} />,
      title: 'High Performance',
      description: 'Vite & React 19で高速な開発体験を実現',
      color: '#667eea',
    },
    {
      icon: <LayersIcon sx={{ fontSize: 40 }} />,
      title: 'Clean Architecture',
      description: 'DDDアーキテクチャで保守性の高いコード',
      color: '#764ba2',
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      title: 'Scalable',
      description: 'モジュール化された拡張可能な構造',
      color: '#f093fb',
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Type Safe',
      description: 'エンティティベースの型安全な実装',
      color: '#f5576c',
    },
  ];

  const backendStack = [
    {
      title: 'Domain Layer',
      description: 'エンティティとビジネスロジック',
      icon: <LayersIcon sx={{ fontSize: 32 }} />,
      items: ['Entity', 'Value Object', 'Repository Interface'],
    },
    {
      title: 'Application Layer',
      description: 'ユースケースの実装',
      icon: <BuildIcon sx={{ fontSize: 32 }} />,
      items: ['Use Cases', 'Application Services', 'DTOs'],
    },
    {
      title: 'Infrastructure Layer',
      description: 'データ永続化とDB接続',
      icon: <StorageIcon sx={{ fontSize: 32 }} />,
      items: ['ORM Models', 'Repository Impl', 'External Services'],
    },
    {
      title: 'Presentation Layer',
      description: 'APIエンドポイントとシリアライザ',
      icon: <ApiIcon sx={{ fontSize: 32 }} />,
      items: ['Presenters', 'Serializers', 'REST APIs'],
    },
  ];

  const frontendStack = [
    {
      title: 'Components',
      description: '再利用可能なUIコンポーネント',
      icon: <CodeIcon sx={{ fontSize: 32 }} />,
      items: ['Button', 'Input', 'Card', 'Layout'],
    },
    {
      title: 'Hooks',
      description: 'カスタムReactフック',
      icon: <BuildIcon sx={{ fontSize: 32 }} />,
      items: ['useFetch', 'useForm', 'useAuth'],
    },
    {
      title: 'API Client',
      description: 'HTTPクライアントとAPI通信',
      icon: <CloudIcon sx={{ fontSize: 32 }} />,
      items: ['GET', 'POST', 'PUT', 'DELETE'],
    },
    {
      title: 'Features',
      description: '機能ごとのモジュール',
      icon: <LayersIcon sx={{ fontSize: 32 }} />,
      items: ['Dashboard', 'Users', 'Settings'],
    },
  ];

  return (
    <PageContainer>
      {/* Hero Section */}
      <Box 
        sx={{ 
          mb: 6,
          textAlign: 'center',
          py: { xs: 4, md: 6 },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            mb: 2,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 700,
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            animation: 'fadeInUp 0.6s ease-out',
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
          Reactango Framework
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary"
          sx={{
            animation: 'fadeInUp 0.6s ease-out 0.2s both',
          }}
        >
          React + Django フルスタックフレームワーク
        </Typography>
      </Box>

      {/* Features Grid */}
      <UniformGrid gap={3} sx={{ mb: 6 }}>
        {features.map((feature, index) => (
          <Card
            key={index}
            hover
            sx={{
              height: '100%',
              minHeight: 180,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              animation: `fadeInUp 0.6s ease-out ${0.3 + index * 0.1}s both`,
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: feature.color,
              },
            }}
          >
            <Box
              sx={{
                color: feature.color,
                mb: 2,
              }}
            >
              {feature.icon}
            </Box>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              {feature.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {feature.description}
            </Typography>
          </Card>
        ))}
      </UniformGrid>

      {/* Backend Architecture */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
          <StorageIcon sx={{ fontSize: 32, color: 'primary.main' }} />
          <Typography variant="h5" fontWeight={700}>
            Backend Architecture
          </Typography>
          <Chip label="Django + DRF" color="primary" size="small" />
        </Box>
        <UniformGrid gap={3} sx={{ mb: 6 }}>
          {backendStack.map((item, index) => (
            <Card
              key={index}
              hover
              sx={{
                height: '100%',
                minHeight: 220,
                animation: `fadeInUp 0.6s ease-out ${0.6 + index * 0.1}s both`,
              }}
            >
              <Box sx={{ mb: 2, color: 'primary.main' }}>
                {item.icon}
              </Box>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {item.description}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                {item.items.map((tech, i) => (
                  <Typography key={i} variant="caption" color="text.secondary">
                    • {tech}
                  </Typography>
                ))}
              </Box>
            </Card>
          ))}
        </UniformGrid>
      </Box>

      {/* Frontend Architecture */}
      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
          <CodeIcon sx={{ fontSize: 32, color: 'secondary.main' }} />
          <Typography variant="h5" fontWeight={700}>
            Frontend Architecture
          </Typography>
          <Chip label="React + Vite" color="secondary" size="small" />
        </Box>
        <UniformGrid gap={3}>
          {frontendStack.map((item, index) => (
            <Card
              key={index}
              hover
              sx={{
                height: '100%',
                minHeight: 220,
                animation: `fadeInUp 0.6s ease-out ${0.9 + index * 0.1}s both`,
              }}
            >
              <Box sx={{ mb: 2, color: 'secondary.main' }}>
                {item.icon}
              </Box>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {item.description}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                {item.items.map((tech, i) => (
                  <Typography key={i} variant="caption" color="text.secondary">
                    • {tech}
                  </Typography>
                ))}
              </Box>
            </Card>
          ))}
        </UniformGrid>
      </Box>

      {/* Quick Links */}
      <Card 
        sx={{ 
          animation: 'fadeInUp 0.6s ease-out 1.3s both',
        }}
      >
        <Typography variant="h5" gutterBottom fontWeight={600} sx={{ mb: 3 }}>
          クイックリンク
        </Typography>
        <Grid container spacing={2}>
          <Grid size={4}>
            <PrimaryButton
              fullWidth
              endIcon={<OpenInNewIcon />}
              href="http://127.0.0.1:8000/"
              target="_blank"
              component="a"
              sx={{ py: 1.5 }}
            >
              Backend API Root
            </PrimaryButton>
          </Grid>
          <Grid size={4}>
            <PrimaryButton
              fullWidth
              endIcon={<OpenInNewIcon />}
              href="http://127.0.0.1:8000/admin/"
              target="_blank"
              component="a"
              sx={{ py: 1.5 }}
            >
              Django Admin
            </PrimaryButton>
          </Grid>
          <Grid size={4}>
            <PrimaryButton
              variant="outlined"
              fullWidth
              endIcon={<OpenInNewIcon />}
              href="https://github.com"
              target="_blank"
              component="a"
              sx={{ py: 1.5 }}
            >
              Documentation
            </PrimaryButton>
          </Grid>
        </Grid>
      </Card>
    </PageContainer>
  );
}
