import { FormControl, Paper, Typography } from '@mui/material';
import { Fragment, useCallback } from 'react';
import { Checkbox } from './Checkbox.js';
import type { JSX } from 'react';
import type { Options } from '../storage.js';
import { useOptions } from '../hooks/use-options.js';

// eslint-disable-next-line @typescript-eslint/naming-convention, max-lines-per-function
const Flags = (): JSX.Element => {
  const [options, { error, loading, set }] = useOptions();

  const handleChange = useCallback((name: keyof Options) => async (value: Options[keyof Options]): Promise<void> => {
    await set({ [name]: value });
  }, [set]);

  return (
    <Fragment>
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
    </Fragment>
  );
};

export { Flags };

export default Flags;
