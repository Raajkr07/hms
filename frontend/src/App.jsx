import { useState } from 'react'
import './styles/index.css'
import '@mantine/core/styles.css'
import { createTheme, MantineProvider } from '@mantine/core';
import AppRoutes from './routes/AppRoutes';
import { BrowserRouter } from 'react-router-dom';
import FloatingChatbot from './components/FloatingChatbot';

const theme = createTheme({
  focusRing:"never",
  fontFamily: "poppins, sans-serif",
  headings: {fontFamily: "merriweather, serif"},
  colors: {
    primary: ['#f1fcfa', '#cff8ef', '#9ff0e1', '#67e1cf', '#32b9a9', '#1fad9f', '#168b82', '#166f69', '#165955', '#174a47', '#072c2b'],  
    neutral: ['#f6f6f6', '#e7e7e7', '#d1d1d1', '#b0b0b0', '#888888', '#6d6d6d', '#5d5d5d', '#4f4f4f', '#454545', '#3d3d3d', '#000000',],
    dark: ['#C1C2C5', '#A6A7AB', '#909296', '#5c5f66', '#373A40', '#2C2E33', '#25262b', '#1A1B1E', '#141517', '#101113']
  },
  primaryColor: "primary",
  primaryShade: 4,
  defaultGradient: {
    from: "primary.4",
    to: "primary.8",
    deg: 132
  },
  darkColorScheme: {
  colorScheme: 'dark',
  colors: {
    background: '#000000',
    text: '#ffffff',
  },
}
});

function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <BrowserRouter>
        <AppRoutes/>
        <FloatingChatbot />
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App
