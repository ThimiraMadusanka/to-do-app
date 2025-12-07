import { useState } from 'react';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import './App.css'

export default function App() {
  const [hasTasksChanged, setHasTasksChanged] = useState(false);

  return (
    <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Add To Do Task Form */}
      <AddTask hasTasksChanged={hasTasksChanged} setHasTasksChanged={setHasTasksChanged} />
      {/* To Do Task List */}
      <TaskList hasTasksChanged={hasTasksChanged} setHasTasksChanged={setHasTasksChanged} />
    </div>
  );
}

