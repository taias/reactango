/**
 * App Layout with Material UI
 */
import {
    Apps as AppsIcon,
    Category as CategoryIcon,
    Home as HomeIcon,
    People as PeopleIcon,
} from '@mui/icons-material';
import {
    AppBar,
    Box,
    Divider,
    Fade,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function AppLayout({ children }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const open = Boolean(anchorEl);

  const menuItems = [
    { text: 'Dashboard', icon: <HomeIcon />, path: '/', divider: false },
    { text: 'ユーザー管理', icon: <PeopleIcon />, path: '/users', divider: true },
    { text: 'プロジェクト機能', icon: <CategoryIcon />, path: '#', disabled: true, divider: false },
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path) => {
    if (path !== '#') {
      navigate(path);
    }
    handleClose();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar 
        position="sticky" 
        elevation={0} 
        sx={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <Toolbar sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ 
              flexGrow: 1, 
              fontWeight: 700, 
              cursor: 'pointer',
              transition: 'opacity 0.2s',
              '&:hover': {
                opacity: 0.9,
              },
            }}
            onClick={() => navigate('/')}
          >
            Reactango
          </Typography>
          <IconButton
            color="inherit"
            onClick={handleClick}
            sx={{
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'scale(1.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <AppsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          elevation: 8,
          sx: {
            minWidth: 200,
            mt: 1.5,
            borderRadius: 2,
            '& .MuiMenuItem-root': {
              borderRadius: 1,
              mx: 1,
              my: 0.5,
              transition: 'all 0.2s',
            },
          },
        }}
      >
        {menuItems.map((item, index) => [
          <MenuItem
            key={item.text}
            onClick={() => handleNavigate(item.path)}
            disabled={item.disabled}
            selected={location.pathname === item.path}
            sx={{
              py: 1.5,
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.text}</ListItemText>
          </MenuItem>,
          item.divider && <Divider key={`divider-${index}`} sx={{ my: 0.5 }} />,
        ])}
      </Menu>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          py: { xs: 3, sm: 4, md: 5 },
          width: '100%',
        }}
      >
        {children}
      </Box>

      <Box
        component="footer"
        sx={{
          py: 3,
          bgcolor: 'background.paper',
          borderTop: 1,
          borderColor: 'divider',
        }}
      >
        <Typography variant="body2" color="text.secondary" align="center">
          Reactango Framework © 2025 - React + Django Full Stack
        </Typography>
      </Box>
    </Box>
  );
}
