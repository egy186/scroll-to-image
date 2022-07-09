import { LinearProgress, styled } from '@mui/material';

const ProgressBar = styled(LinearProgress)(({ theme }) => ({
  left: 0,
  position: 'fixed',
  right: 0,
  top: 0,
  zIndex: theme.zIndex.appBar + 1
}));

export { ProgressBar };

export default ProgressBar;
