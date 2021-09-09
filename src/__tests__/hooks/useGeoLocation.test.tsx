import { renderHook } from '@testing-library/react-hooks';
import useGeoLocation from '../../hooks/useGeoLocation';

describe('useGeoLocation custom hook', () => {
  test('should return null', () => {
    const { result } = renderHook(() => useGeoLocation());
    // console.error = jest.fn()
    // const logError = console.error('Geolocation is not supported by this browser.');

    // console.log(`navigator.geolocation`, navigator.geolocation)
    // console.log(`result`, result)
    // jest.spyOn(global.console, 'error')
    // console.log(`result.current`, result.current)
    // console.log(`result.error`, result.error)
    expect(result.current).toBe(null);
    // expect(result.error).toBe('Geolocation is not supported by this browser.')
    // expect(console.error).not.toBeCalled();
  });
});
