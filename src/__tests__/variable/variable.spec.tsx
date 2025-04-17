import { describe, expect, vi, beforeEach, it, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Variables } from '../../widgets';
import { Form } from 'antd';

beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  vi.mock('next-intl', () => ({
    useTranslations: vi.fn(() => (key: string) => key),
  }));

  vi.mock('../utils/getVariablesFromLocalStore', () => ({
    getVariablesFromLocalStore: vi.fn(),
    convertVariablesToArray: vi.fn((data) => (data ? Object.values(data) : [])),
    addDataVariablesToLocalStore: vi.fn(),
  }));
  vi.spyOn(console, 'error').mockReturnValue();
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('Variables component', () => {
  it('render', async () => {
    render(
      <Form>
        <Variables />
      </Form>
    );

    expect(
      screen.getByText('variables.noneSavedVariables')
    ).toBeInTheDocument();
  });

  it('add new variable', async () => {
    render(
      <Form>
        <Variables />
      </Form>
    );

    const addButton = screen.getByText('variables.buttonAddNewRow');
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getAllByRole('textbox')).toHaveLength(2);
    });
  });

  it('shows errors', async () => {
    render(
      <Form>
        <Variables />
      </Form>
    );

    fireEvent.click(screen.getByText('variables.buttonAddNewRow'));
    fireEvent.click(screen.getByText('variables.savedVariables'));

    await waitFor(() => {
      expect(screen.getAllByText('variables.validationMessage')).toHaveLength(
        2
      );
    });
  });
});
