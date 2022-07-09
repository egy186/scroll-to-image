import { Button, ButtonGroup, AppBar as MUIAppBar, Toolbar, Typography } from '@mui/material';
import { useCallback, useRef } from 'react';
import { initialOptions } from '../constant';
import { useStorage } from '../hooks/use-storage';

// eslint-disable-next-line max-lines-per-function
const AppBar = () => {
  const [options, { set }] = useStorage(initialOptions);

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
    <MUIAppBar position="static">
      <Toolbar>
        <Typography
          component="h1"
          sx={{ flexGrow: 1 }}
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
    </MUIAppBar>
  );
};

export { AppBar };

export default AppBar;
