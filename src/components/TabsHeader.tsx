import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import styled from 'styled-components';

import { TabsHeaderProps } from '../types';

const TabsContainer = styled(Tabs)`
  flex: 1;
  padding-right: 1rem;
`;

export default function TabsHeader(props: TabsHeaderProps) {
  const { regions, currentTab, handleChange } = props;

  return (
    <TabsContainer
      value={currentTab}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons="auto"
      data-testid="tabs-header-container"
    >
      {regions.map((label) => (
        <Tab data-testid="tab-label" key={label} label={label} />
      ))}
    </TabsContainer>
  );
}
