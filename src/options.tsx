import { Container, CssBaseline, FormControl, Paper, StyledEngineProvider, TableContainer, ThemeProvider, Typography, createTheme, useMediaQuery } from '@mui/material';
import type { ScrollToImageOptions, ScrollToImagePattern } from './constant.js';
import { useCallback, useMemo } from 'react';
import { AppBar } from './components/AppBar.js';
import { Checkbox } from './components/Checkbox.js';
import type { Column } from '@material-table/core';
import type { JSX } from 'react';
import MaterialTable from '@material-table/core';
import { ProgressBar } from './components/ProgressBar.js';
import { createRoot } from 'react-dom/client';
import { initialOptions } from './constant.js';
import { tableIcons } from './components/tableIcons.js';
import { useStorage } from './hooks/use-storage.js';

const columns = [
  {
    field: 'pattern',
    title: 'URL (regex)',
    type: 'string'
  },
  {
    field: 'selector',
    title: 'CSS Selector',
    type: 'string'
  }
] as const satisfies readonly Column<ScrollToImagePattern>[];

// eslint-disable-next-line @typescript-eslint/naming-convention, max-lines-per-function
const App = (): JSX.Element => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(() => createTheme({ palette: { mode: prefersDarkMode ? 'dark' : 'light' } }), [prefersDarkMode]);

  const [options, { error, loading, set }] = useStorage(initialOptions);

  const onRowAdd = useCallback(async (newItem: ScrollToImagePattern) => {
    const list = [...options.list, newItem];
    await set({ list });
  }, [options.list, set]);

  const onRowDelete = useCallback(async (oldItem: ScrollToImagePattern) => {
    const list = options.list.filter(item => item.pattern !== oldItem.pattern);
    await set({ list });
  }, [options.list, set]);

  const onRowUpdate = useCallback(async (newItem: ScrollToImagePattern, oldItem: ScrollToImagePattern) => {
    const index = options.list.findIndex(item => item.pattern === oldItem.pattern);
    const list = [
      ...options.list.slice(0, index),
      newItem,
      ...options.list.slice(index + 1, options.list.length)
    ];
    await set({ list });
  }, [options.list, set]);

  const handleChange = useCallback((name: keyof ScrollToImageOptions) => async (value: ScrollToImageOptions[keyof ScrollToImageOptions]): Promise<void> => {
    await set({ [name]: value });
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
            {/* @ts-expect-error TS2786 */}
            <MaterialTable
              columns={columns}
              data={options.list}
              editable={{
                onRowAdd,
                onRowDelete,
                onRowUpdate
              }}
              icons={tableIcons}
              isLoading={loading || error !== null}
              options={{
                addRowPosition: 'first',
                draggable: false,
                headerStyle: { backgroundColor: 'inherit' }
              }}
              title="Patterns"
            />
          </TableContainer>
        </Container>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

const root = createRoot(document.querySelector('#app-container') as HTMLDivElement);

root.render(<App />);
