/* eslint-disable react/display-name */
/* eslint-disable react/no-multi-comp */

import { AddBox, ArrowDownward, Check, ChevronLeft, ChevronRight, Clear, Delete, Edit, FirstPage, LastPage, Remove, Search } from '@mui/icons-material';
import { forwardRef } from 'react';

const tableIcons = {
  Add: forwardRef((props, ref) => (
    <AddBox
      color="primary"
      {...props}
      ref={ref}
    />
  )),
  Check: forwardRef((props, ref) => (
    <Check
      {...props}
      ref={ref}
    />
  )),
  Clear: forwardRef((props, ref) => (
    <Clear
      {...props}
      ref={ref}
    />
  )),
  Delete: forwardRef((props, ref) => (
    <Delete
      {...props}
      color="secondary"
      ref={ref}
    />
  )),
  Edit: forwardRef((props, ref) => (
    <Edit
      color="primary"
      {...props}
      ref={ref}
    />
  )),
  FirstPage: forwardRef((props, ref) => (
    <FirstPage
      {...props}
      ref={ref}
    />
  )),
  LastPage: forwardRef((props, ref) => (
    <LastPage
      {...props}
      ref={ref}
    />
  )),

  NextPage: forwardRef((props, ref) => (
    <ChevronRight
      {...props}
      ref={ref}
    />
  )),

  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft
      {...props}
      ref={ref}
    />
  )),
  ResetSearch: forwardRef((props, ref) => (
    <Clear
      {...props}
      ref={ref}
    />
  )),
  Search: forwardRef((props, ref) => (
    <Search
      {...props}
      ref={ref}
    />
  )),
  SortArrow: forwardRef((props, ref) => (
    <ArrowDownward
      {...props}
      ref={ref}
    />
  )),
  ThirdStateCheck: forwardRef((props, ref) => (
    <Remove
      {...props}
      ref={ref}
    />
  ))
};

export { tableIcons };

export default tableIcons;
