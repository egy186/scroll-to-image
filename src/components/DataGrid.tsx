import { DataGridActions, DataGridActionsHandlersContext } from './DataGridActions.js';
import type { GridColDef, GridEventListener, GridRowId, GridRowModel, GridRowModesModel, GridRowsProp } from '@mui/x-data-grid';
import { GridRowEditStopReasons, GridRowModes, DataGrid as MUIXDataGrid } from '@mui/x-data-grid';
import { Paper, TableContainer } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { DataGridToolbar } from './DataGridToolbar.js';
import type { JSX } from 'react';
import type { Options } from '../storage.js';
import { useOptions } from '../hooks/use-options.js';

type OptionsListItem = Options['list'][number];

const columns = [
  {
    field: 'actions',
    headerName: 'Actions',
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    renderCell: (params): JSX.Element => <DataGridActions {...params} />,
    type: 'actions'
  },
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
] as const satisfies ReadonlyArray<GridColDef<GridRowModel<OptionsListItem>, string>>;

// eslint-disable-next-line max-lines-per-function
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

  const actionsHandlers = useMemo(() => ({
    cancel: (id: GridRowId): void => {
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
    },
    delete: (id: GridRowId): void => {
    // eslint-disable-next-line no-alert
      const result = confirm('Are you sure?');
      if (result) {
        const newRows = rows.filter(row => row.id !== id);
        set({ list: newRows });
        setRows(newRows);
      }
    },
    edit: (id: GridRowId): void => {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.Edit }
      });
    },
    isInEditMode: (id: GridRowId): boolean => rowModesModel[id]?.mode === GridRowModes.Edit,
    save: (id: GridRowId): void => {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View }
      });
    }
  } as const), [
    rowModesModel,
    rows,
    set
  ]);

  return (
    <TableContainer component={Paper}>
      <DataGridActionsHandlersContext value={actionsHandlers}>
        <MUIXDataGrid
          columns={columns}
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
          showToolbar
          slotProps={{
            toolbar: {
              setRowModesModel,
              setRows
            }
          }}
          slots={{ toolbar: DataGridToolbar }}
          sx={{
            // eslint-disable-next-line @typescript-eslint/naming-convention
            '& :nth-last-child(1 of .MuiDataGrid-columnHeader) .MuiDataGrid-columnSeparator': { display: 'none' },
            border: 0
          }}
        />
      </DataGridActionsHandlersContext>
    </TableContainer>
  );
};

export { DataGrid };

export default DataGrid;
