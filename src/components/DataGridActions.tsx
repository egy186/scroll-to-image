import { Close, Delete, Edit, Save } from '@mui/icons-material';
import { GridActionsCell, GridActionsCellItem } from '@mui/x-data-grid';
import type { GridRenderCellParams, GridRowId } from '@mui/x-data-grid';
import { createContext, useCallback, useContext } from 'react';
import type { JSX } from 'react';

interface DataGridActionsHandlers {
  cancel: (id: GridRowId) => void;
  delete: (id: GridRowId) => void;
  edit: (id: GridRowId) => void;
  isInEditMode: (id: GridRowId) => boolean;
  save: (id: GridRowId) => void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const DataGridActionsHandlersContext = createContext<DataGridActionsHandlers>({
  cancel: () => undefined,
  delete: () => undefined,
  edit: () => undefined,
  isInEditMode: () => false,
  save: () => undefined
});

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/prefer-readonly-parameter-types, max-lines-per-function
const DataGridActions = (props: GridRenderCellParams): JSX.Element => {
  const { id } = props;

  const { cancel, delete: deleteFn, edit, isInEditMode, save } = useContext(DataGridActionsHandlersContext);

  const handleCancelClick = useCallback(() => {
    cancel(id);
  }, [cancel, id]);

  const handleDeleteClick = useCallback(() => {
    deleteFn(id);
  }, [deleteFn, id]);

  const handleEditClick = useCallback(() => {
    edit(id);
  }, [edit, id]);

  const handleSaveClick = useCallback(() => {
    save(id);
  }, [save, id]);

  return (
    <GridActionsCell {...props}>
      {isInEditMode(id)
        ? [
          <GridActionsCellItem
            color="inherit"
            icon={<Save />}
            key="save"
            label="Save"
            onClick={handleSaveClick}
          />,
          <GridActionsCellItem
            color="inherit"
            icon={<Close />}
            key="cancel"
            label="Cancel"
            onClick={handleCancelClick}
          />
        ]
        : [
          <GridActionsCellItem
            icon={<Edit />}
            key="edit"
            label="Edit"
            material={{ color: 'primary' }}
            onClick={handleEditClick}
          />,
          <GridActionsCellItem
            icon={<Delete />}
            key="delete"
            label="Delete"
            material={{ color: 'secondary' }}
            onClick={handleDeleteClick}
          />
        ]}
    </GridActionsCell>
  );
};

export type { DataGridActionsHandlers };

export { DataGridActions, DataGridActionsHandlersContext };
