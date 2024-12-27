import type { ChangeEvent, JSX, ReactNode } from 'react';
import { FormControlLabel, Checkbox as MUICheckbox } from '@mui/material';
import { useCallback } from 'react';

interface ChackboxProps {
  readonly checked: boolean;
  readonly disabled: boolean;
  readonly label: Readonly<ReactNode>;
  readonly name: string;
  readonly onChange: (checked: boolean) => void | Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention ,@typescript-eslint/prefer-readonly-parameter-types
const Checkbox = ({ checked, disabled, label, name, onChange }: ChackboxProps): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  const handleChange = useCallback(async (evt: Readonly<ChangeEvent<HTMLInputElement>>) => {
    await onChange(evt.target.checked);
  }, [onChange]);

  return (
    <FormControlLabel
      control={(
        <MUICheckbox
          checked={checked}
          color="primary"
          name={name}
          /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
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
