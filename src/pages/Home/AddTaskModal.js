import axios from "axios";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../../firebase.init";

const AddTaskModal = ({ user, setClose, refetch }) => {
  // const [user, loading, error] = useAuthState(auth);
  const handleAddTask = async (event) => {
    event.preventDefault();
    const task = {
      email: user.email,
      name: event.target.name.value,
      description: event.target.description.value,
    };
    console.log(task);

    const { data } = await axios.post("http://localhost:5000/task", task);
    console.log(data);
    if (data.acknowledged) {
      toast.success("Task has been added");
    }
    refetch();
    setClose(true);
  };
  return (
    <div>
      <input type="checkbox" id="addTask-modal" class="modal-toggle" />
      <div class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
          <label
            htmlFor="addTask-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg text-primary">
            Enter Required Information
          </h3>
          <form
            onSubmit={handleAddTask}
            className="mt-10 grid grid-cols-1 gap-4"
          >
            <input
              type="text"
              id="name"
              name="name"
              className="input input-bordered w-full max-w-lg"
              placeholder="Task Name"
              required
            />
            <textarea
              type="text"
              id="description"
              name="description"
              className="input input-bordered w-full max-w-lg h-20"
              placeholder="Task Description"
              required
            />
            <div className="modal-action">
              <input
                type="submit"
                value="Add"
                className="btn btn-primary text-white w-full max-w-lg"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
