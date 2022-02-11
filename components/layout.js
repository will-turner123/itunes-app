import React, { useState, useMemo, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from './sidebar';


export default function Layout(props) {
  const [darkMode, setDarkMode] = useState(false);

  // colors
  const sidebarColor = "#82b1ff";
  const sidebarText = "#9CA3AF";
  const mainBg = darkMode ? "#272727" : "#F9FAFC";

  useEffect(() => {
    if(("darkMode" in localStorage)){
      const useDarkMode = JSON.parse(localStorage.getItem("darkMode"));
      if(darkMode !== useDarkMode){
        setDarkMode(useDarkMode);
      }
    }
  }, [darkMode])
  // TODO: remove unused colors
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          mainBg: mainBg,
          sidebarColor: sidebarColor,
          sidebarText: sidebarText,
          hover: darkMode ? "rgba(255,255,255, 0.08)" : "rgba(0,0,0, 0.08)"
        },
      }),
    [darkMode, mainBg],
  );

  const handleThemeChange = () => {
    localStorage.setItem("darkMode", !darkMode);
    setDarkMode(!darkMode);
  };


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Sidebar darkMode={darkMode} handleThemeChange={handleThemeChange} activePage={props.activePage}>
        { props.children }
      </Sidebar>
    </ThemeProvider>
  );
}