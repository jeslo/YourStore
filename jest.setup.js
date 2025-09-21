import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]), // mock your fetch response
  }),
);
