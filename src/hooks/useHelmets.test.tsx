import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Provider, useDispatch } from 'react-redux';

import { useHelmets } from './useHelmets';
import { Helmet } from '../model/helmet';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../store/store';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn().mockReturnValue(jest.fn()),
}));

const mockNewHelmet = {} as FormData;
const mockIdToDelete = '1';
const mockHelmetList = [{} as Helmet];

describe('Given useUsers Hook', () => {
  const TestComponent = () => {
    const { loadHelmets, createHelmet, deleteHelmet, classifyHelmets } =
      useHelmets();

    return (
      <>
        <button onClick={() => loadHelmets()}></button>
        <button onClick={() => createHelmet(mockNewHelmet)}> </button>
        <button onClick={() => deleteHelmet(mockIdToDelete)}> </button>
        <button onClick={() => classifyHelmets(mockHelmetList)}> </button>
      </>
    );
  };

  let elements: HTMLElement[];

  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <TestComponent></TestComponent>;
        </MemoryRouter>
      </Provider>
    );
    elements = screen.getAllByRole('button');
  });

  describe('When we click button loadHelmets', () => {
    test('Then the dispacht should have been called', async () => {
      await userEvent.click(elements[0]);
      expect(useDispatch()).toHaveBeenCalled();
    });
  });

  describe('When we click button createHelmet', () => {
    test('Then the dispacht should have been called', async () => {
      await userEvent.click(elements[1]);
      expect(useDispatch()).toHaveBeenCalled();
    });
  });

  describe('When we click button deleteHelmet', () => {
    test('Then the dispacht should have been called', async () => {
      await userEvent.click(elements[2]);
      expect(useDispatch()).toHaveBeenCalled();
    });
  });

  describe('When we click button classifyHelmets ', () => {
    test('Then the dispacht should have been called', async () => {
      await userEvent.click(elements[3]);
      expect(useDispatch()).toHaveBeenCalled();
    });
  });
});
/* 
describe('Given useUsers Hook With errors', () => {
  const mockUseHelmets = useHelmets as jest.MockedFunction<typeof useHelmets>;
  console.log(mockUseHelmets);
  let elements: HTMLElement[];

  describe('When we click button loadHelmets', () => {
    test('Then it should throw an error', async () => {
      await expect(userEvent.click(elements[0])).rejects.toThrowError(
        'Error loading helmets'
      );
    });
  });

  describe('When we click button createHelmet', () => {
    test('Then it should throw an error', async () => {
      await expect(userEvent.click(elements[1])).rejects.toThrowError(
        'Error creating helmet'
      );
    });
  });

  describe('When we click button deleteHelmet', () => {
    test('Then it should throw an error', async () => {
      await expect(userEvent.click(elements[2])).rejects.toThrowError(
        'Error deleting helmet'
      );
    });
  });

  describe('When we click button classifyHelmets ', () => {
    test('Then it should throw an error', async () => {
      await expect(userEvent.click(elements[3])).rejects.toThrowError(
        'Error classifying helmets'
      );
    });
  });
}); */
