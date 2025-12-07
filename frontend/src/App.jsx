import './App.css'
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';

export default function App() {
  return (
    <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Add To Do Task Form */}
      <AddTask />
      {/* To Do Task List */}
      <TaskList />
    </div>
  );
}

