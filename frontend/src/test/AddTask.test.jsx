import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import AddTask from '../components/AddTask';
import * as tasksService from '../services/tasks.service';

vi.mock('sweetalert2', () => ({
  default: {
    fire: vi.fn(),
  },
}));

describe('AddTask - Unit Test', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('creating task', async () => {
    const createTask = vi.spyOn(tasksService, 'createTask').mockResolvedValue({ status: 201 });
    const setHasTasksChanged = vi.fn();

    render(<AddTask hasTasksChanged={false} setHasTasksChanged={setHasTasksChanged} />);

    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Test title' } });
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Test description' } });

    fireEvent.click(screen.getByText('Add'));

    await waitFor(() => expect(createTask).toHaveBeenCalledWith({ title: 'Test title', description: 'Test description' }));
    expect(setHasTasksChanged).toHaveBeenCalled();

    expect(screen.getByPlaceholderText('Title').value).toBe('');
    expect(screen.getByPlaceholderText('Description').value).toBe('');
  });
});
