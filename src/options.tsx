import { Container, CssBaseline, FormControl, Paper, StyledEngineProvider, TableContainer, ThemeProvider, Typography, createTheme } from '@mui/material';
import { AppBar } from './components/AppBar.js';
import { Checkbox } from './components/Checkbox.js';
import { DataGrid } from './components/DataGrid.js';
import type { JSX } from 'react';
import type { Options } from './storage.js';
import { ProgressBar } from './components/ProgressBar.js';
import { createRoot } from 'react-dom/client';
import { useCallback } from 'react';
import { useOptions } from './hooks/use-options.js';

type OptionsListItem = Options['list'][number];

const theme = createTheme({ colorSchemes: { dark: true } });

// eslint-disable-next-line @typescript-eslint/naming-convention, max-lines-per-function
const App = (): JSX.Element => {
  const [options, { error, loading, set }] = useOptions();

  const handleChange = useCallback((name: keyof Options) => async (value: Options[keyof Options]): Promise<void> => {
    await set({ [name]: value });
  }, [set]);

  const handlePersistRows = useCallback(async (list: readonly OptionsListItem[]) => {
    await set({ list });
  }, [set]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {loading ? <ProgressBar /> : null}
        <AppBar />
        {/* eslint-disable-next-line @typescript-eslint/naming-convention */}
        <Container sx={{ '& > *': { marginY: 2 } }}>
          {error
            ? (
              <Paper sx={{ padding: 2 }}>
                <Typography
                  color="error"
                  component="h2"
                  gutterBottom
                  variant="h5"
                >
                  {'Error'}
                </Typography>
                <Typography color="error">
                  {String(error)}
                </Typography>
              </Paper>
            )
            : null}
          <Paper sx={{ padding: 2 }}>
            <FormControl>
              {([
                {
                  label: 'Fit image height',
                  name: 'fitHeight'
                },
                {
                  label: 'Scroll animation',
                  name: 'scrollAnimation'
                },
                {
                  label: 'Scroll to the first image on load',
                  name: 'scrollToFirst'
                }
              ] as const).map(({ label, name }) => (
                <Checkbox
                  checked={options[name]}
                  disabled={loading || error !== null}
                  key={name}
                  label={label}
                  name={name}
                  onChange={handleChange(name)}
                />
              ))}
            </FormControl>
          </Paper>
          <TableContainer component={Paper}>
            <DataGrid
              onPersistRows={handlePersistRows}
              rows={options.list}
            />
          </TableContainer>
        </Container>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

const root = createRoot(document.querySelector('#app-container') as HTMLDivElement);

root.render(<App />);
