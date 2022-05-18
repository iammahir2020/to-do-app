import React from "react";

const SingleTask = ({ task, handleDelete, handleCompleteTask }) => {
  const { _id, name, description } = task;
  return (
    <div className="card border border-black text-black">
      <div className="card-body">
        {task.complete ? (
          <>
            <h2 className="card-title line-through">{name}</h2>
            <p className="line-through">{description}</p>
          </>
        ) : (
          <>
            <h2 className="card-title">{name}</h2>
            <p>{description}</p>
          </>
        )}

        <div className="card-actions justify-end">
          <button
            disabled={task.complete}
            onClick={() => handleCompleteTask(_id)}
            className="btn btn-primary text-white"
          >
            Complete
          </button>
          <button
            onClick={() => handleDelete(_id)}
            className="btn btn-ghost text-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleTask;
