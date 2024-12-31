import { Button, ButtonGroup, AppBar as MUIAppBar, Toolbar, Typography } from '@mui/material';
import { useCallback, useRef } from 'react';
import type { JSX } from 'react';
import type { Options } from '../storage.js';
import { ProgressBar } from './ProgressBar.js';
import { useOptions } from '../hooks/use-options.js';

// eslint-disable-next-line @typescript-eslint/naming-convention, max-lines-per-function
const AppBar = (): JSX.Element => {
  const [options, { loading, set }] = useOptions();

  const inputFile = useRef<HTMLInputElement>(null);
  const handleImportClick = useCallback(() => {
    inputFile.current?.click();
  }, []);
  const handleImport = useCallback(async () => {
    const text = await inputFile.current?.files?.[0]?.text() ?? '{}';
    await set(JSON.parse(text) as Options);
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
      {loading ? <ProgressBar /> : null}
      <Toolbar>
        <Typography
          component="h1"
          sx={{ flexGrow: 1 }}
          variant="h6"
        >
          {'Scroll to Image Options'}
        </Typography>
        <ButtonGroup color="inherit">
          <Button onClick={handleImportClick}>
            {'Import'}
          </Button>
          <input
            hidden
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
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
