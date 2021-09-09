// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// https://stackoverflow.com/a/43957674

// @ts-ignore
global.navigator.geolocation = {
  getCurrentPosition: jest.fn().mockImplementationOnce((success) =>
    Promise.resolve(
      success({
        coords: {
          latitude: 0,
          longitude: 0,
        },
      })
    )
  ),
};
// @ts-ignore
global.navigator.permissions = {
  query: jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      state: 'granted',
    })
  ),
};
