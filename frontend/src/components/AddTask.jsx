import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { createTask } from '../services/tasks.service';

const AddTask = ({ hasTasksChanged, setHasTasksChanged }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: ""
  });
  const [formValidationErrors, setFormValidationErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  // Method for input onChange
  const handelOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Input field validation method
  const validate = () => {
    const inputErrors = {};
    if (formData.title === "") inputErrors.title = true;
    if (formData.description === "") inputErrors.description = true;
    return inputErrors;
  };

  // Method for submit form
  const handelSubmit = async () => {
    try {
      setIsLoading(true);
      const newErrors = validate();
      // Check input validations
      if (Object.keys(newErrors).length === 0) {
        const response = await createTask(formData);

        // Check success status
        if (response.status === 201) {
          Swal.fire({
            title: "Success..!",
            text: "New task added successfully!",
            icon: "success",
            confirmButtonText: "Ok",
            customClass: {
              confirmButton: "px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            },
            buttonsStyling: false,
          });
          setHasTasksChanged(!hasTasksChanged)
          setFormData({
            title: "",
            description: ""
          });
        } else {
          // Failed task creation
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
          setFormData({
            title: "",
            description: ""
          });
        }
      } else {
        // Set validation errors
        setFormValidationErrors(newErrors);
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
      setFormData({
        title: "",
        description: ""
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 border-r-0 md:border-r-1 border-gray-300">
        <h2 className="text-xl font-bold mb-4">Add a Task</h2>

        <input
          type="text"
          name='title'
          placeholder="Title"
          value={formData.title}
          onChange={(e) => handelOnChange(e)}
          className={`w-full shadow rounded-md p-3 mb-5 
            ${formValidationErrors.title ? "border border-red-500 bg-red-50" : ""}`}
        />

        <textarea
          placeholder="Description"
          name='description'
          value={formData.description}
          onChange={(e) => handelOnChange(e)}
          className={`w-full shadow rounded-md p-3 mb-7 
            ${formValidationErrors.title ? "border border-red-500 bg-red-50" : ""}`}
        ></textarea>

        <button
            className="px-10 py-1 bg-blue-800 text-white rounded-lg hover:bg-blue-500 float-end"
            onClick={() => handelSubmit()}
            disabled={isLoading}
        >
            {isLoading ? "Processing.." : "Add" }
        </button>
      </div>
  )
}

export default AddTask