import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading/Loading";
import AddTaskModal from "./AddTaskModal";
import SingleTask from "./SingleTask";

const Home = () => {
  const [close, setClose] = useState(false);
  // const [tasks, setTasks] = useState([]);
  const [user, loading, error] = useAuthState(auth);
  // useEffect(() => {
  //   const url = `https://shrouded-sea-13534.herokuapp.com/task?email=${user?.email}`;
  //   const getTask = async () => {
  //     const { data } = await axios.get(url);
  //     setTasks(data);
  //   };
  //   getTask();
  // }, [user, close]);

  const {
    data: tasks,
    isLoading,
    refetch,
  } = useQuery("task", () =>
    fetch(
      `https://shrouded-sea-13534.herokuapp.com/task?email=${user?.email}`
    ).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading></Loading>;
  }

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const url = `https://shrouded-sea-13534.herokuapp.com/task?id=${_id}`;
        const { data } = await axios.delete(url);
        if (data.acknowledged) {
          // console.log("asdasd");
          refetch();
        }
        Swal.fire("Removed!", "Your task has been removed.", "success");
      }
    });
  };

  const handleCompleteTask = async (_id) => {
    console.log(_id);
    const url = `https://shrouded-sea-13534.herokuapp.com/task?id=${_id}`;
    const { data } = await axios.put(url, { complete: true });
    if (data.acknowledged) {
      toast.success("Task Complete");
      console.log(data);
      refetch();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 md:px-5 lg:px-0">
      <hr />
      <div className="flex justify-between my-5">
        <h2 className="text-3xl font-semibold mb-5">Task List</h2>
        <label
          onClick={() => setClose(false)}
          htmlFor="addTask-modal"
          className="btn btn-secondary modal-button"
        >
          Add New Task
        </label>
      </div>
      {!close && (
        <AddTaskModal
          user={user}
          setClose={setClose}
          refetch={refetch}
        ></AddTaskModal>
      )}
      {/* <h2 className="text-2xl font-semibold mb-5">Task List:{tasks.length}</h2> */}
      {tasks.length === 0 ? (
        <h2 className="text-2xl text-gray-500 font-semibold mb-5">
          You have no task to do...
        </h2>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {tasks?.map((task) => (
            <SingleTask
              key={task._id}
              task={task}
              handleDelete={handleDelete}
              handleCompleteTask={handleCompleteTask}
            ></SingleTask>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
