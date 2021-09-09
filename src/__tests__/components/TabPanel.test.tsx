import { render } from '@testing-library/react';
import TabPanel from '../../components/TabPanel';

describe('<TabPanel />', () => {
  it('render correctly with text children', () => {
    const { queryByTestId } = render(<TabPanel value={0} index={0} children={'haha'} />);
    const tabPanel = queryByTestId('tab-panel');
    const contentWrapper = queryByTestId('content-wrapper');
    // const { findByTestId } = render(<TabPanel value={0} index={0} children={'haha'} />);

    expect(tabPanel).toBeInTheDocument();
    expect(tabPanel).toBeVisible();
    expect(tabPanel).toHaveTextContent('haha');
    expect(contentWrapper).toBeTruthy();
  });

  it('render correctly without child', () => {
    const { queryByTestId } = render(<TabPanel value={0} index={0} />);
    const tabPanel = queryByTestId('tab-panel');

    expect(tabPanel).toBeInTheDocument();
    expect(tabPanel).toBeVisible();
    expect(tabPanel).not.toHaveTextContent('haha');
  });
});
