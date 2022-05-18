import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading/Loading";
import AddTaskModal from "./AddTaskModal";
import SingleTask from "./SingleTask";

const Home = () => {
  const [close, setClose] = useState(false);
  // const [tasks, setTasks] = useState([]);
  const [user, loading, error] = useAuthState(auth);
  // useEffect(() => {
  //   const url = `http://localhost:5000/task?email=${user?.email}`;
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
    fetch(`http://localhost:5000/task?email=${user?.email}`).then((res) =>
      res.json()
    )
  );

  if (isLoading) {
    return <Loading></Loading>;
  }

  const handleDelete = (_id) => {
    console.log(_id);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 md:px-5 lg:px-0">
      <hr />
      <div className="flex justify-between my-5">
        <h2 className="text-3xl font-semibold mb-5">Task List</h2>
        <label
          onClick={() => setClose(false)}
          for="addTask-modal"
          class="btn btn-secondary modal-button"
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
      <h2 className="text-2xl font-semibold mb-5">Task List:{tasks.length}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {tasks?.map((task) => (
          <SingleTask
            key={task._id}
            task={task}
            handleDelete={handleDelete}
          ></SingleTask>
        ))}
      </div>
    </div>
  );
};

export default Home;
