import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PieChartIcon from '@mui/icons-material/PieChart';
import LogoutIcon from '@mui/icons-material/Logout';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link'
const drawerWidth = 240;


const NavItem = ({href, icon, title, activePage}) => {

  const active = href.replace('/', '') === activePage;
  return (
    <ListItem disableGutters sx={{ display: 'flex', mb: 0.5, py: 0, px: 2}}>
    <Link href={href} passHref>
      <Button 
        component="a"
        startIcon={icon}
        sx={{
          backgroundColor: active && 'hover',
          borderRadius: 1,
          color: active ? 'text.primary' : 'text.secondary',
          justifyContent: 'flex-start',
          px: 3,
          py: 1,
          textAlign: 'left',
          textTransform: 'upper',
          fontWeight: 700,
          width: '100%',
          '& .MuiButton-startIcon': {
            color: active ? 'text.primary' : 'text.secondary',
            fontWeight: 700
          },
          '&:hover': {
            backgroundColor: 'hover'
          }
        }}
        >
          <Box sx={{ flexGrow: 1}}>
            { title }
          </Box>
        </Button>
    </Link>
  </ListItem>
  )
}



export default function Sidebar(props) {
    const { window } = props;
    const { page } = props.activePage;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

  const drawer = (
    <>
    <Box sx={{
      height: "100%",
      color: "sidebarText",
    }}>
      <Toolbar />
      <List>
        <NavItem href="/search" icon={<SearchIcon/>} title="Search" activePage={props.activePage}/>
        <NavItem href="/" icon={<LibraryMusicIcon/>} title="Your Library" activePage={props.activePage}/>
        <NavItem href="/data" icon={<PieChartIcon/>} title="Your Taste" activePage={props.activePage}/>
        <Divider/>
        <NavItem href="/logout" icon={<LogoutIcon/>} title="Logout" activePage={props.activePage}/>
      </List>
    </Box>
    </>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "background.paper",
          color: "text.primary",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Creatively Named iTunes app
          </Typography>
          <Box sx={{ml: 'auto', alignItems: 'center'}} display="flex">
            {props.darkMode ? <DarkModeIcon/> : <LightModeIcon/>}
            <Switch checked={props.darkMode} onChange={props.handleThemeChange}/>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ 
          width: { sm: drawerWidth }, 
          flexShrink: { sm: 0 } }}
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ 
          backgroundColor: "mainBg",
          flexGrow: 1, 
          p: 3,
          height: "100%",
          minHeight: "100vh",
          width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        { props.children }
      </Box>
    </Box>
  );
}