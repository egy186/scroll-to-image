import { LinearProgress, styled } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/prefer-readonly-parameter-types
const ProgressBar = styled(LinearProgress)(({ theme }) => ({
  left: 0,
  position: 'fixed',
  right: 0,
  top: 0,
  zIndex: theme.zIndex.appBar + 1
}));

export { ProgressBar };

export default ProgressBar;
