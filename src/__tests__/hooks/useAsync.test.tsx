import { renderHook, act } from '@testing-library/react-hooks';
import useAsync from '../../hooks/useAsync';

const demoData = {
  clouds: [
    {
      cloud_description: 'Africa, South Africa - Amazon Web Services: Cape Town',
      cloud_name: 'aws-af-south-1',
      geo_latitude: -33.92,
      geo_longitude: 18.42,
      geo_region: 'africa',
    },
    {
      cloud_description: 'Africa, South Africa - Azure: South Africa North',
      cloud_name: 'azure-south-africa-north',
      geo_latitude: -26.198,
      geo_longitude: 28.03,
      geo_region: 'africa',
    },
  ],
};

describe('useAsync custom hook', () => {
  test('should return data after fetch', async () => {
    // @ts-ignore
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(demoData),
      })
    );

    const { result, waitForNextUpdate } = renderHook(() => useAsync('test-url'));
    await act(() => waitForNextUpdate());

    expect(fetch).toHaveBeenCalledWith('test-url');
    expect(result.current).toStrictEqual({
      isLoading: false,
      data: demoData,
      error: null,
    });
  });

  test('should catch error', async () => {
    // @ts-ignore
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.reject('Error occured!'),
      })
    );

    const { result, waitForNextUpdate } = renderHook(() => useAsync('test-url'));
    await act(() => waitForNextUpdate());

    expect(result.current).toStrictEqual({
      isLoading: false,
      data: null,
      error: 'Error occured!',
    });
  });

  test('should isLoading change from false to true when there is an error', async () => {
    // @ts-ignore
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(demoData),
      })
    );

    const { result, waitForNextUpdate } = renderHook(() => useAsync('test-url'));

    expect(result.current.isLoading).toBe(true);
    await act(() => waitForNextUpdate());
    expect(result.current.isLoading).toBe(false);
  });

  test('should isLoading change from false to true when success', async () => {
    // @ts-ignore
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.reject('Error occured!'),
      })
    );

    const { result, waitForNextUpdate } = renderHook(() => useAsync('test-url'));

    expect(result.current.isLoading).toBe(true);
    await act(() => waitForNextUpdate());
    expect(result.current.isLoading).toBe(false);
  });
});
