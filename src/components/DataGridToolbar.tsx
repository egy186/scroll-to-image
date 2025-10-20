import { GridRowModes, Toolbar, ToolbarButton } from '@mui/x-data-grid';
import type { GridRowModesModel, GridSlotProps, GridRowsProp as MUIXGridRowsProp } from '@mui/x-data-grid';
import { Add } from '@mui/icons-material';
import type { JSX } from 'react';
import type { Options } from '../storage.js';
import { Tooltip } from '@mui/material';
import { useCallback } from 'react';

type GridRowsProp = MUIXGridRowsProp<Options['list'][number] & { readonly isNew?: boolean }>;

declare module '@mui/x-data-grid' {
  interface ToolbarPropsOverrides {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
      // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
      newModel: (oldModel: GridRowModesModel) => GridRowModesModel
    ) => void;
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/prefer-readonly-parameter-types
const DataGridToolbar = ({ setRows, setRowModesModel }: GridSlotProps['toolbar']): JSX.Element => {
  const handleClick = useCallback(() => {
    const id = crypto.randomUUID();
    setRows(oldRows => [
      {
        id,
        isNew: true,
        pattern: '',
        selector: ''
      },
      ...oldRows
    ]);
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    setRowModesModel(oldModel => ({
      ...oldModel,
      [id]: {
        fieldToFocus: 'pattern',
        mode: GridRowModes.Edit
      }
    }));
  }, [setRowModesModel, setRows]);

  return (
    <Toolbar>
      <Tooltip title="Add pattern">
        <ToolbarButton onClick={handleClick}>
          <Add fontSize="small" />
        </ToolbarButton>
      </Tooltip>
    </Toolbar>
  );
};

export { DataGridToolbar };

export default DataGridToolbar;
