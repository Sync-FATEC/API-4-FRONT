import '@testing-library/jest-dom';

beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });


