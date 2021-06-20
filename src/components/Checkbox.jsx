import { FormControlLabel, Checkbox as MUICheckbox } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useCallback } from 'react';

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

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  label: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export { Checkbox };

export default Checkbox;
