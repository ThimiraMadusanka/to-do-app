import React, { useState } from 'react'

const TaskList = () => {
    const [tasks, setTasks] = useState([
    { title: "Buy books", description: "Buy books for the next school year" },
    { title: "Clean home", description: "Need to clean the bed room" },
    { title: "Takehome assignment", description: "Finish the mid-term assignment" },
    { title: "Play Cricket", description: "Plan the soft ball cricket match on next Sunday" },
    { title: "Help Saman", description: "Saman need help with his software project" },
  ]);

  return (
    <div className="space-y-5">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="p-5 bg-gray-200 rounded-xl shadow"
          >
            <h3 className="text-lg font-bold">{task.title}</h3>
            <div className='flex justify-between items-center'>
                <p className="text-sm font-semibold text-gray-700">{task.description}</p>
                <button className="border px-10 py-1 rounded-lg">Done</button>
            </div>
          </div>
        ))}
      </div>
  )
}

export default TaskList