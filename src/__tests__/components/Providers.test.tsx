import Providers from '../../components/Providers';
import { render, fireEvent } from '@testing-library/react';

describe('hello', () => {
  const providers = [
    { value: 'aws', label: 'Amazon Web Services', logo: 'logo' },
    { value: 'azure', label: 'Azure', logo: 'logo' },
    { value: 'google', label: 'Google Cloud', logo: 'logo' },
    { value: 'do', label: 'DigitalOcean', logo: 'logo' },
    { value: 'upcloud', label: 'UpCloud', logo: 'logo' },
  ];

  const handleSelectProvider = jest.fn();
  const isActive = jest.fn();

  test('should render correctly with all correct props', () => {
    const component = render(
      <Providers providers={providers} handleSelect={handleSelectProvider} isActive={isActive} />
    );
    const container = component.getByTestId('providers');

    expect(container).toBeTruthy();
    expect(container).toBeInTheDocument();
  });

  test('should not render when providers is empty array', () => {
    const component = render(
      <Providers providers={[]} handleSelect={handleSelectProvider} isActive={isActive} />
    );
    const { container } = component;

    expect(container).toBeEmptyDOMElement();
  });

  test('should render cards equal to the length of providers', () => {
    const component = render(
      <Providers providers={providers} handleSelect={handleSelectProvider} isActive={isActive} />
    );
    const container = component.getByTestId('providers');

    expect(container.childElementCount).toEqual(providers.length);
  });

  test('should call handleSelect when select a provider', () => {
    const component = render(
      <Providers providers={providers} handleSelect={handleSelectProvider} isActive={isActive} />
    );

    const selectComponent = component.getByTestId('aws');

    fireEvent.click(selectComponent);
    expect(handleSelectProvider).toHaveBeenCalledTimes(1);
  });
});
