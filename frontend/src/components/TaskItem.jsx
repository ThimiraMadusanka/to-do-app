import React from 'react'

const TaskItem = ({ id, title, description, buttonOnClick }) => {
  return (
    <div key={id} className="p-5 bg-gray-200 rounded-xl shadow">
        <h3 className="text-lg font-bold">{title}</h3>
        <div className='flex justify-between items-center'>
            <p className="text-sm font-semibold text-gray-700">{description}</p>
            <button 
                className="border px-10 py-1 rounded-lg hover:bg-gray-700 hover:text-white transition"
                onClick={() => buttonOnClick()}
            >
                Done
            </button>
        </div>
    </div>
  )
}

export default TaskItem