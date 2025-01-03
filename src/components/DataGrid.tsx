import { Close, Delete, Edit, Save } from '@mui/icons-material';
import { GridActionsCellItem, GridRowEditStopReasons, GridRowModes, DataGrid as MUIXDataGrid } from '@mui/x-data-grid';
import type { GridActionsCellItemProps, GridColDef, GridEventListener, GridRowId, GridRowModel, GridRowModesModel, GridRowsProp } from '@mui/x-data-grid';
import type { JSX, ReactElement } from 'react';
import { Paper, TableContainer } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { DataGridToolbar } from './DataGridToolbar.js';
import type { Options } from '../storage.js';
import { useOptions } from '../hooks/use-options.js';

type OptionsListItem = Options['list'][number];

const columns = [
  {
    editable: true,
    field: 'pattern',
    flex: 1,
    headerName: 'URL (regex)',
    type: 'string'
  },
  {
    editable: true,
    field: 'selector',
    flex: 1,
    headerName: 'CSS Selector',
    type: 'string'
  }
] as const satisfies GridColDef<GridRowModel<OptionsListItem>, string>[];

// eslint-disable-next-line @typescript-eslint/naming-convention, max-lines-per-function, max-statements
const DataGrid = (): JSX.Element => {
  const [{ list }, { loading, set }] = useOptions();
  const [rows, setRows] = useState<GridRowsProp<OptionsListItem & { readonly isNew?: boolean }>>(list);
  useEffect(() => {
    setRows(list);
  }, [list]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  const handleRowEditStop: GridEventListener<'rowEditStop'> = useCallback((params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  }, []);

  const handleEditClick = useCallback((id: GridRowId) => (): void => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.Edit }
    });
  }, [rowModesModel, setRowModesModel]);

  const handleSaveClick = useCallback((id: GridRowId) => (): void => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View }
    });
  }, [rowModesModel, setRowModesModel]);

  const handleDeleteClick = useCallback((id: GridRowId) => (): void => {
    // eslint-disable-next-line no-alert
    const result = confirm('Are you sure?');
    if (result) {
      const newRows = rows.filter(row => row.id !== id);
      set({ list: newRows });
      setRows(newRows);
    }
  }, [set, rows]);

  const handleCancelClick = useCallback((id: GridRowId) => (): void => {
    setRowModesModel({
      ...rowModesModel,
      [id]: {
        ignoreModifications: true,
        mode: GridRowModes.View
      }
    });

    const editedRow = rows.find(row => row.id === id);
    if (editedRow?.isNew === true) {
      setRows(rows.filter(row => row.id !== id));
    }
  }, [
    rowModesModel,
    rows,
    setRowModesModel,
    setRows
  ]);

  const processRowUpdate = useCallback((newRow: GridRowModel<OptionsListItem>) => {
    const updatedRow = {
      ...newRow,
      isNew: false
    };
    const updatedRows = rows.map(row => {
      if (row.id === newRow.id) {
        return updatedRow;
      }
      return row;
    });

    set({ list: updatedRows });
    setRows(updatedRows);

    return updatedRow;
  }, [set, rows]);

  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  const handleRowModesModelChange = useCallback((newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  }, [setRowModesModel]);

  const columnsWithActions = useMemo(() => [
    {
      field: 'actions',
      // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
      getActions: ({ id }): readonly ReactElement<GridActionsCellItemProps>[] => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              color="inherit"
              icon={<Save />}
              key="save"
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              color="inherit"
              icon={<Close />}
              key="cancel"
              label="Cancel"
              onClick={handleCancelClick(id)}
            />
          ];
        }

        return [
          <GridActionsCellItem
            color="primary"
            icon={<Edit />}
            key="edit"
            label="Edit"
            onClick={handleEditClick(id)}
          />,
          <GridActionsCellItem
            color="secondary"
            icon={<Delete />}
            key="delete"
            label="Delete"
            onClick={handleDeleteClick(id)}
          />
        ];
      },
      headerName: 'Actions',
      type: 'actions'
    },
    ...columns
  ] as const satisfies GridColDef<GridRowModel<OptionsListItem>, string>[], [
    handleCancelClick,
    handleDeleteClick,
    handleEditClick,
    handleSaveClick,
    rowModesModel
  ]);

  return (
    <TableContainer component={Paper}>
      <MUIXDataGrid
        columns={columnsWithActions}
        disableColumnFilter
        disableColumnMenu
        disableColumnResize
        disableColumnSelector
        disableRowSelectionOnClick
        editMode="row"
        loading={loading}
        onRowEditStop={handleRowEditStop}
        onRowModesModelChange={handleRowModesModelChange}
        processRowUpdate={processRowUpdate}
        rowModesModel={rowModesModel}
        rows={rows}
        slotProps={{
          toolbar: {
            setRowModesModel,
            setRows
          }
        }}
        slots={{ toolbar: DataGridToolbar }}
        sx={{
        /* eslint-disable @typescript-eslint/naming-convention */
          '& .MuiDataGrid-container--top [role="row"]': { background: 'inherit' },
          '& .MuiDataGrid-row--editing .MuiDataGrid-cell': { background: 'inherit' },
          '& :nth-last-child(1 of .MuiDataGrid-columnHeader) .MuiDataGrid-columnSeparator': { display: 'none' },
          /* eslint-enable @typescript-eslint/naming-convention */
          border: 0
        }}
      />
    </TableContainer>
  );
};

export { DataGrid };

export default DataGrid;
