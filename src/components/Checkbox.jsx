/* eslint-disable jsdoc/require-param-description, jsdoc/require-returns-description  */

import { FormControlLabel, Checkbox as MUICheckbox } from '@mui/material';
import { useCallback } from 'react';

// eslint-disable-next-line jsdoc/imports-as-dependencies, jsdoc/lines-before-block
/** @typedef {import('react')} React */

/**
 * @param {object} options
 * @param {boolean} options.checked
 * @param {boolean} options.disabled
 * @param {React.ReactNode} options.label
 * @param {string} options.name
 * @param {(checked: boolean) => void | Promise<void>} options.onChange
 * @returns {React.ReactNode}
 */
// eslint-disable-next-line react/prop-types
const Checkbox = ({ checked, disabled, label, name, onChange }) => {
  const handleChange = useCallback(evt => {
    onChange(evt.target.checked);
  }, [onChange]);

  return (
    <FormControlLabel
      control={(
        <MUICheckbox
          checked={checked}
          color="primary"
          name={name}
          onChange={handleChange}
        />
      )}
      disabled={disabled}
      label={label}
    />
  );
};

export { Checkbox };

export default Checkbox;
