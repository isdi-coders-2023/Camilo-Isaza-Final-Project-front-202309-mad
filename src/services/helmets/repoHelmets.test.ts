import 'jest-fetch-mock';
import { Helmet } from '../../model/helmet';
import { RepoHelmets } from './repoHelmets';

describe('Given repo class', () => {
  let jsonMock: jest.Mock;
  const mockedToken = '1';
  describe('When we instantiate getHelmets with url address', () => {
    beforeEach(() => {
      jsonMock = jest.fn().mockResolvedValue([]);
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jsonMock,
      });
    });
    test('Then method getUsers should be used', async () => {
      const expected: Helmet[] = [];
      const repo = new RepoHelmets(mockedToken);
      const result = await repo.getHelmets();
      expect(jsonMock).toHaveBeenCalled();
      expect(result).toStrictEqual(expected);
    });
  });
  describe('When we instantiate getHelmets and response is bad', () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
      });
    });
    test('Then method getCountry should throw an error', async () => {
      const repo = new RepoHelmets(mockedToken);
      await expect(repo.getHelmets()).rejects.toThrow();
    });
  });

  describe('When we instantiate createHelmet with url address', () => {
    beforeEach(() => {
      jsonMock = jest.fn().mockResolvedValue({} as Helmet);
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jsonMock,
      });
    });
    test('Then method createHelmet should be used', async () => {
      const newUser = {
        name: 'Hello',
      } as unknown as FormData;
      const expected: Helmet = {} as Helmet;
      const repo = new RepoHelmets(mockedToken);
      const result = await repo.createHelmet(newUser);
      expect(jsonMock).toHaveBeenCalled();
      expect(result).toStrictEqual(expected);
    });
  });
  describe('When we instantiate createHelmet and response is bad', () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
      });
    });
    test('Then method createUser should throw an error', async () => {
      const newUser = {
        name: 'Hello',
      } as unknown as FormData;
      const repo = new RepoHelmets(mockedToken);
      await expect(repo.createHelmet(newUser)).rejects.toThrow();
    });
  });

  describe('When we instantiate updateHelmet with url address', () => {
    beforeEach(() => {
      jsonMock = jest.fn().mockResolvedValue({} as Helmet);
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jsonMock,
      });
    });
    test('Then method updateHelmet should be used', async () => {
      const userId = '1';
      const updateduser = {
        name: 'Hello',
      } as unknown as FormData;
      const expected: Helmet = {} as Helmet;
      const repo = new RepoHelmets(mockedToken);
      const result = await repo.updateHelmet(userId, updateduser);
      expect(jsonMock).toHaveBeenCalled();
      expect(result).toStrictEqual(expected);
    });
  });
  describe('When we instantiate updateHelmet and response is bad', () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
      });
    });
    test('Then method createUser should throw an error', async () => {
      const userId = '1';
      const updateduser = {
        name: 'Hello',
      } as unknown as FormData;
      const repo = new RepoHelmets(mockedToken);
      await expect(repo.updateHelmet(userId, updateduser)).rejects.toThrow();
    });
  });

  describe('When we instantiate deleteHelmet with url address', () => {
    beforeEach(() => {
      jsonMock = jest.fn().mockResolvedValue([]);
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jsonMock,
      });
    });
    test('Then method deleteHelmet should be used', async () => {
      const userId = '1';

      const expected: Helmet[] = [];
      const repo = new RepoHelmets(mockedToken);
      const result = await repo.deleteHelmet(userId);
      expect(jsonMock).toHaveBeenCalled();
      expect(result).toStrictEqual(expected);
    });
  });
  describe('When we instantiate deleteHelmet and response is bad', () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
      });
    });
    test('Then method deleteHelmet should throw an error', async () => {
      const userId = '1';

      const repo = new RepoHelmets(mockedToken);
      await expect(repo.deleteHelmet(userId)).rejects.toThrow();
    });
  });
});
