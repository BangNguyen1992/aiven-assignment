import { render, fireEvent } from '@testing-library/react';
import TabsHeader from '../../components/TabsHeader';

describe('TabsHeader component', () => {
  const regions = ['africa', 'australia', 'east asia', 'europe'];
  const handleChange = jest.fn();

  test('should render correctly with all correct props', () => {
    const component = render(
      <TabsHeader regions={regions} currentTab={0} handleChange={handleChange} />
    );
    const tabsContainer = component.getByTestId('tabs-header-container');

    expect(tabsContainer).toBeTruthy();
    expect(tabsContainer).toBeInTheDocument();
  });
  test('should not render any tab label when regions is empty array', () => {
    const component = render(
      <TabsHeader regions={[]} currentTab={0} handleChange={handleChange} />
    );
    const tabList = component.getByRole('tablist');

    expect(tabList.childElementCount).toEqual(0);
  });

  test('should render labels equal to the length of regions prop', () => {
    const component = render(
      <TabsHeader regions={regions} currentTab={0} handleChange={handleChange} />
    );
    const tabLabel = component.getAllByTestId('tab-label');

    expect(tabLabel).toHaveLength(regions.length);
  });

  test('should call handleChange when click on tab label', () => {
    const component = render(
      <TabsHeader regions={regions} currentTab={0} handleChange={handleChange} />
    );

    fireEvent.click(component.getAllByTestId('tab-label')[0]);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
