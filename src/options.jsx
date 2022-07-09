import { Container, CssBaseline, FormControl, Paper, StyledEngineProvider, TableContainer, ThemeProvider, Typography, createTheme, useMediaQuery } from '@mui/material';
import { useCallback, useMemo } from 'react';
import { AppBar } from './components/AppBar';
import { Checkbox } from './components/Checkbox';
import MaterialTable from '@material-table/core';
import { ProgressBar } from './components/ProgressBar';
import ReactDOM from 'react-dom';
import { initialOptions } from './constant';
import { tableIcons } from './components/tableIcons';
import { useStorage } from './hooks/use-storage';

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
];

// eslint-disable-next-line max-lines-per-function
const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(() => createTheme({ palette: { mode: prefersDarkMode ? 'dark' : 'light' } }), [prefersDarkMode]);

  const [options, { error, loading, set }] = useStorage(initialOptions);

  const onRowAdd = useCallback(async newItem => {
    const list = [...options.list, newItem];
    await set({ list });
  }, [options.list, set]);

  const onRowDelete = useCallback(async oldItem => {
    const list = options.list.filter(item => item.pattern !== oldItem.pattern);
    await set({ list });
  }, [options.list, set]);

  const onRowUpdate = useCallback(async (newItem, oldItem) => {
    const index = options.list.findIndex(item => item.pattern === oldItem.pattern);
    const list = [
      ...options.list.slice(0, index),
      newItem,
      ...options.list.slice(index + 1, options.list.length)
    ];
    await set({ list });
  }, [options.list, set]);

  const handleChange = useCallback(name => async value => {
    await set({ [name]: value });
  }, [set]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {loading ? <ProgressBar /> : null}
        <AppBar />
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
              {[
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
              ].map(({ label, name }) => (
                <Checkbox
                  checked={options[name]}
                  disabled={loading || error}
                  key={name}
                  label={label}
                  name={name}
                  onChange={handleChange(name)}
                />
              ))}
            </FormControl>
          </Paper>
          <TableContainer component={Paper}>
            <MaterialTable
              columns={columns}
              data={options.list}
              editable={{
                onRowAdd,
                onRowDelete,
                onRowUpdate
              }}
              icons={tableIcons}
              isLoading={loading || error}
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

ReactDOM.render(<App />, document.querySelector('#app-container'));
