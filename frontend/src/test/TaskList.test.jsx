import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import TaskList from '../components/TaskList';
import * as tasksService from '../services/tasks.service';

vi.mock('sweetalert2', () => ({
  default: {
    fire: vi.fn(),
  },
}));

describe('TaskList - Unit Test', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('renders tasks and completing a task', async () => {
    const tasks = [{ id: 1, title: 'Test title', description: 'Test description' }];
    vi.spyOn(tasksService, 'getTasks').mockResolvedValue({ status: 200, data: tasks });
    const completeTask = vi.spyOn(tasksService, 'completeTask').mockResolvedValue({ status: 200 });
    const setHasTasksChanged = vi.fn();

    render(<TaskList hasTasksChanged={false} setHasTasksChanged={setHasTasksChanged} />);

    expect(await screen.findByText('Test title')).toBeTruthy();
    expect(await screen.findByText('Test description')).toBeTruthy();

    fireEvent.click(screen.getByText('Done'));

    await waitFor(() => expect(completeTask).toHaveBeenCalledWith(1));
    expect(setHasTasksChanged).toHaveBeenCalled();
  });
});
