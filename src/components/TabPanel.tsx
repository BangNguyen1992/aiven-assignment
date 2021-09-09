import Box from '@material-ui/core/Box';
import { TabPanelProps } from '../types';

export default function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  // prettier-ignore
  return (
    <div data-testid="tab-panel">
      {value === index && <Box data-testid="content-wrapper" p={3}>{children}</Box>}
    </div>
  )
}
