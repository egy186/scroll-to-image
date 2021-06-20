import { AppBar, Button, ButtonGroup, Container, CssBaseline, FormControl, LinearProgress, Paper, TableContainer, ThemeProvider, Toolbar, Typography, createMuiTheme, makeStyles, useMediaQuery } from '@material-ui/core';
import { useCallback, useMemo, useRef } from 'react';
import { Checkbox } from './components/Checkbox';
import MaterialTable from '@material-table/core';
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

const useStyles = makeStyles(theme => ({
  paper: { padding: theme.spacing(2) },
  progressBar: {
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: theme.zIndex.appBar + 1
  },
  root: { '& > *': { margin: theme.spacing(2, 0) } },
  title: { flexGrow: 1 }
}));

// eslint-disable-next-line max-lines-per-function, max-statements
const App = () => {
  const classes = useStyles();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(() => createMuiTheme({
    palette: prefersDarkMode
      ? {
        primary: { main: '#90caf9' },
        secondary: { main: '#f48fb1' },
        type: 'dark'
      }
      : {
        primary: { main: '#1976d2' },
        secondary: { main: '#d81b60' },
        type: 'light'
      }
  }), [prefersDarkMode]);

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

  const inputFile = useRef(null);
  const handleImportClick = useCallback(() => {
    inputFile.current.click();
  }, []);
  const handleImport = useCallback(async () => {
    const text = await inputFile.current.files[0].text();
    await set(JSON.parse(text));
  }, [set]);

  const handleExport = useCallback(() => {
    const blob = new Blob([JSON.stringify(options)], { type: 'application/json' });
    const objectURL = window.URL.createObjectURL(blob);
    const anchorElement = document.createElement('a');
    const mouseEvent = new MouseEvent('click');
    anchorElement.href = objectURL;
    anchorElement.download = 'options.json';
    anchorElement.dispatchEvent(mouseEvent);
    window.URL.revokeObjectURL(objectURL);
  }, [options]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {loading && <LinearProgress classes={{ root: classes.progressBar }} />}
      <AppBar position="static">
        <Toolbar>
          <Typography
            classes={{ root: classes.title }}
            component="h1"
            variant="h6"
          >
            {'Options'}
          </Typography>
          <ButtonGroup color="inherit">
            <Button onClick={handleImportClick}>
              {'Import'}
            </Button>
            <input
              hidden
              onChange={handleImport}
              ref={inputFile}
              type="file"
            />
            <Button onClick={handleExport}>
              {'Export'}
            </Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
      <Container classes={{ root: classes.root }}>
        {error && (
          <Paper classes={{ root: classes.paper }}>
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
        )}
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
            options={{ addRowPosition: 'first' }}
            title="Patterns"
          />
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.querySelector('#app-container'));
