import { Container, CssBaseline, StyledEngineProvider, ThemeProvider, createTheme } from '@mui/material';
import { AppBar } from './components/AppBar.js';
import { DataGrid } from './components/DataGrid.js';
import { Flags } from './components/Flags.js';
import type { JSX } from 'react';
import { OptionsProvider } from './hooks/use-options.js';
import { createRoot } from 'react-dom/client';

const theme = createTheme({ colorSchemes: { dark: true } });

// eslint-disable-next-line @typescript-eslint/naming-convention
const App = (): JSX.Element => (
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <OptionsProvider>
        <AppBar />
        {/* eslint-disable-next-line @typescript-eslint/naming-convention */}
        <Container sx={{ '& > *': { marginY: 2 } }}>
          <Flags />
          <DataGrid />
        </Container>
      </OptionsProvider>
    </ThemeProvider>
  </StyledEngineProvider>
);

const root = createRoot(document.querySelector('#app-container') as HTMLDivElement);

root.render(<App />);
