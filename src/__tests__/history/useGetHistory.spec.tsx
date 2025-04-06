import { describe, it, expect, vi, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useGetHistory } from '../../widgets/History/lib';

afterEach(() => {
  vi.clearAllMocks();
});

describe('useGetHistory', () => {
  it('parses history correctly', () => {
    const mockStorage = {
      userRenderCrew: JSON.stringify({ user: 'test@example.com' }),
      dbRenderCrew: JSON.stringify({
        'test@example.com': {
          history: [
            'http://localhost:3000/en/rest-client/POST/aHR0cHMlM0ElMkYlMkZqc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tJTJGcG9zdHM=/JTdCJTIydGl0bGUlMjIlM0ElMjJmYWtlVGl0bGUlMjIlMkMlMjJ1c2VySWQlMjIlM0ExJTJDJTIyYm9keSUyMiUzQSUyMmZha2VNZXNzYWdlJTIyJTdE?=asdasdasdasdasdasdasd&Content-Type=application%2Fjson',
            'http://localhost:3000/en/rest-client/GET/aHR0cHMlM0ElMkYlMkZqc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tJTJGcG9zdHM=/JTdCJTIydGl0bGUlMjIlM0ElMjJmYWtlVGl0bGUlMjIlMkMlMjJ1c2VySWQlMjIlM0ExJTJDJTIyYm9keSUyMiUzQSUyMmZha2VNZXNzYWdlJTIyJTdE?Content-Type=application%2Fjson',
            'http://localhost:3000/en/rest-client/GET/aHR0cHMlM0ElMkYlMkZqc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tJTJGcG9zdHM=/JTdCJTIydGl0bGUlMjIlM0ElMjJmYWtlVGl0bGUlMjIlMkMlMjJ1c2VySWQlMjIlM0ExJTJDJTIyYm9keSUyMiUzQSUyMmZha2VNZXNzYWdlJTIyJTdE',
          ],
        },
      }),
    };

    Storage.prototype.getItem = vi.fn(
      (key) => mockStorage[key as keyof typeof mockStorage]
    );
    const setHistory = vi.fn();
    renderHook(() => useGetHistory(setHistory));

    expect(setHistory).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          method: 'POST',
          url: expect.any(String),
          href: '/rest-client/POST/aHR0cHMlM0ElMkYlMkZqc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tJTJGcG9zdHM=/JTdCJTIydGl0bGUlMjIlM0ElMjJmYWtlVGl0bGUlMjIlMkMlMjJ1c2VySWQlMjIlM0ExJTJDJTIyYm9keSUyMiUzQSUyMmZha2VNZXNzYWdlJTIyJTdE?=asdasdasdasdasdasdasd&Content-Type=application%2Fjson',
        }),
      ])
    );
    expect(setHistory).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          method: 'GET',
          url: expect.any(String),
        }),
      ])
    );
    expect(setHistory).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          method: 'GET',
          url: expect.any(String),
          href: '/rest-client/GET/aHR0cHMlM0ElMkYlMkZqc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tJTJGcG9zdHM=/JTdCJTIydGl0bGUlMjIlM0ElMjJmYWtlVGl0bGUlMjIlMkMlMjJ1c2VySWQlMjIlM0ExJTJDJTIyYm9keSUyMiUzQSUyMmZha2VNZXNzYWdlJTIyJTdE?http://localhost:3000/en/rest-client/GET/aHR0cHMlM0ElMkYlMkZqc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tJTJGcG9zdHM=/JTdCJTIydGl0bGUlMjIlM0ElMjJmYWtlVGl0bGUlMjIlMkMlMjJ1c2VySWQlMjIlM0ExJTJDJTIyYm9keSUyMiUzQSUyMmZha2VNZXNzYWdlJTIyJTdE',
        }),
      ])
    );
  });

  it('not user', () => {
    const mockStorage = {};

    Storage.prototype.getItem = vi.fn(
      (key) => mockStorage[key as keyof typeof mockStorage]
    );

    const setHistory = vi.fn();
    renderHook(() => useGetHistory(setHistory));

    expect(setHistory).not.toBeCalled();
  });

  it('not db', () => {
    const mockStorage = {
      userRenderCrew: JSON.stringify({ user: 'test@example.com' }),
    };

    Storage.prototype.getItem = vi.fn(
      (key) => mockStorage[key as keyof typeof mockStorage]
    );

    const setHistory = vi.fn();
    renderHook(() => useGetHistory(setHistory));

    expect(setHistory).toHaveBeenCalledWith([]);
  });

  it('parses history incorrectly', () => {
    const mockStorage = {};

    Storage.prototype.getItem = vi.fn(
      (key) => mockStorage[key as keyof typeof mockStorage]
    );

    const setHistory = vi.fn();
    renderHook(() => useGetHistory(setHistory));

    expect(setHistory).not.toBeCalled();
  });
});
