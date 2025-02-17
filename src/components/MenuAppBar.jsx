import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { LoginContext } from '../context/LoginContext'; // Contexto de login
import { ThemeContext } from '../context/ThemeContext'; // Contexto de tema
import SearchBar from './SearchBar';

export default function MenuAppBar() {
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null); // Para el menú de opciones
  const { loginData } = useContext(LoginContext); // Obtener el contexto de login
  const { darkMode, toggleTheme } = useContext(ThemeContext); // Obtener el contexto de tema

  // Controlar el menú de opciones
  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <Box
      minWidth="800px"
      sx={{
        flexGrow: 1,
        backgroundColor: darkMode ? '#121212' : '#f5f5f5',
        color: darkMode ? '#ffffff' : '#000000',
        transition: 'background-color 0.3s ease',
      }}
    >
      <AppBar
        position="static"
        sx={{
          backgroundColor: darkMode ? '#333' : '#1976d2',
          transition: 'background-color 0.3s ease',
        }}
      >
        <Toolbar>
          {/* Botón de menú con opciones */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography marginRight="10px" variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Random Application
          </Typography>

          <SearchBar />

          {/* Menú de opciones */}
          <Menu
            id="menu-options"
            anchorEl={menuAnchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(menuAnchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem>
              <NavLink to="/Images">Imágenes</NavLink>
            </MenuItem>

            <MenuItem>
              <NavLink to="/Components">Componentes</NavLink>
            </MenuItem>

            <MenuItem>
              <NavLink to="/Tareas">Tareas</NavLink>
            </MenuItem>

            <MenuItem>
              <NavLink to="/Informes">Informes</NavLink>
            </MenuItem>
          </Menu>

          {/* Botón de cambio de tema */}
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="toggle theme"
            onClick={toggleTheme}
          >
            {darkMode ? '🌙' : '☀️'}
          </IconButton>

          {/* Botón de login */}
          <NavLink to="/Login" style={{ textDecoration: 'none', color: 'inherit' }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-login"
              aria-haspopup="true"
              color="inherit"
              onClick={(e) => {
                if (loginData.email) {
                  e.preventDefault(); // Evitar la navegación
                  alert(`Logged in as: ${loginData.email}`); // Mostrar el email
                }
              }}
            >
              <AccountCircle />
            </IconButton>
          </NavLink>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
