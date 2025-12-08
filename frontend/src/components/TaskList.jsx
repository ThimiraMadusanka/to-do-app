import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { SyncLoader } from "react-spinners";
import { completeTask, getTasks } from '../services/tasks.service';
import TaskItem from './TaskItem';

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const TaskList = ({ hasTasksChanged, setHasTasksChanged }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      setIsLoading(true);

      // Fetch tasks
      const data = await getTasks();

      // Check response status
      if (data.status === 200) {
        // If successful, update state
        setTasks(data.data);
      } else {
        // If not, set error
        console.error('Failed to fetch tasks');
        setIsError(true);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [hasTasksChanged])
  
  // Task competion method
  const handleTaskCompletion = async (taskId) => {
    try {
      const complete = await completeTask(taskId);

      if (complete.status === 200) {
        setHasTasksChanged(!hasTasksChanged);
        Swal.fire({
          title: "Success..!",
          text: "Task completed successfully!",
          icon: "success",
          confirmButtonText: "Ok",
          customClass: {
            confirmButton: "px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          },
          buttonsStyling: false,
        });
      } else {
        Swal.fire({
          title: "Oops..!",
          text: "Something went wrong!",
          icon: "error",
          confirmButtonText: "Ok",
          customClass: {
            confirmButton: "px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          },
          buttonsStyling: false,
        });
      }
    } catch (error) {
      console.error("Error: ", error);
      Swal.fire({
        title: "Oops..!",
        text: "Something went wrong!",
        icon: "error",
        confirmButtonText: "Ok",
        customClass: {
          confirmButton: "px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        },
        buttonsStyling: false,
      });
    }
  }

  return (
    <div className="space-y-5">
      {/* Task data Loading */}
      <div className="text-center">
        <SyncLoader
          color="#000"
          loading={isLoading}
          cssOverride={override}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>

      {/* Error for task data loading */}
      {!isLoading && isError && (
        <div className="p-5 bg-red-200 rounded-xl shadow">
          <h3 className="text-lg text-red-700 font-bold">Ooops..!</h3>
          <p className="text-sm font-semibold text-red-700">Something went wrong.</p>
        </div>
      )}

      {!isLoading && !isError && (
        tasks.length !== 0 ? (
          tasks.map((task) => (
            // Show task data
            <TaskItem
              id={task.id}
              title={task.title}
              description={task.description} 
              buttonOnClick={() => handleTaskCompletion(task.id)}
            />
          ))) : (
            // No task data
            <div className="p-5 bg-gray-200 rounded-xl shadow">
              <h3 className="text-lg font-bold">No data found..!</h3>
              <p className="text-sm font-semibold text-gray-700">Please add new task.</p>
            </div>
          )
        )
      }
    </div>
  )
}

export default TaskList