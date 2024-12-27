/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
/* eslint-disable react/display-name */
/* eslint-disable react/no-multi-comp */

import { AddBox, ArrowDownward, Check, ChevronLeft, ChevronRight, Clear, Delete, Edit, FirstPage, LastPage, Remove, Search } from '@mui/icons-material';
import { forwardRef } from 'react';

const tableIcons = {
  Add: forwardRef<SVGSVGElement | null>((props, ref) => (
    <AddBox
      color="primary"
      {...props}
      ref={ref}
    />
  )),
  Check: forwardRef<SVGSVGElement | null>((props, ref) => (
    <Check
      {...props}
      ref={ref}
    />
  )),
  Clear: forwardRef<SVGSVGElement | null>((props, ref) => (
    <Clear
      {...props}
      ref={ref}
    />
  )),
  Delete: forwardRef<SVGSVGElement | null>((props, ref) => (
    <Delete
      {...props}
      color="secondary"
      ref={ref}
    />
  )),
  Edit: forwardRef<SVGSVGElement | null>((props, ref) => (
    <Edit
      color="primary"
      {...props}
      ref={ref}
    />
  )),
  FirstPage: forwardRef<SVGSVGElement | null>((props, ref) => (
    <FirstPage
      {...props}
      ref={ref}
    />
  )),
  LastPage: forwardRef<SVGSVGElement | null>((props, ref) => (
    <LastPage
      {...props}
      ref={ref}
    />
  )),

  NextPage: forwardRef<SVGSVGElement | null>((props, ref) => (
    <ChevronRight
      {...props}
      ref={ref}
    />
  )),

  PreviousPage: forwardRef<SVGSVGElement | null>((props, ref) => (
    <ChevronLeft
      {...props}
      ref={ref}
    />
  )),
  ResetSearch: forwardRef<SVGSVGElement | null>((props, ref) => (
    <Clear
      {...props}
      ref={ref}
    />
  )),
  Search: forwardRef<SVGSVGElement | null>((props, ref) => (
    <Search
      {...props}
      ref={ref}
    />
  )),
  SortArrow: forwardRef<SVGSVGElement | null>((props, ref) => (
    <ArrowDownward
      {...props}
      ref={ref}
    />
  )),
  ThirdStateCheck: forwardRef<SVGSVGElement | null>((props, ref) => (
    <Remove
      {...props}
      ref={ref}
    />
  ))
};

export { tableIcons };

export default tableIcons;
