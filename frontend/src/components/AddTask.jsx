import React from 'react'

const AddTask = () => {
  return (
    <div className="p-6 border-r-0 md:border-r-1 border-gray-300">
        <h2 className="text-xl font-bold mb-4">Add a Task</h2>

        <input
          type="text"
          placeholder="Title"
        //   value={title}
        //   onChange={(e) => setTitle(e.target.value)}
          className="w-full shadow rounded-md p-3 mb-5"
        />

        <textarea
          placeholder="Description"
        //   value={description}
        //   onChange={(e) => setDescription(e.target.value)}
          className="w-full shadow rounded-md p-3 h-24 mb-7"
        ></textarea>

        <button
            className="px-10 py-1 bg-blue-800 text-white rounded-lg hover:bg-blue-500 float-end"
        >
            Add
        </button>
      </div>
  )
}

export default AddTask