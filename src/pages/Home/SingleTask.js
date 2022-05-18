import React from "react";

const SingleTask = ({ task, handleDelete, handleCompleteTask }) => {
  const { _id, name, description } = task;
  return (
    <div class="card border border-primary text-primary">
      <div class="card-body">
        {task.complete ? (
          <>
            <h2 class="card-title line-through">{name}</h2>
            <p className="line-through">{description}</p>
          </>
        ) : (
          <>
            <h2 class="card-title">{name}</h2>
            <p>{description}</p>
          </>
        )}

        <div class="card-actions justify-end">
          <button
            disabled={task.complete}
            onClick={() => handleCompleteTask(_id)}
            class="btn btn-secondary text-primary"
          >
            Complete
          </button>
          <button
            onClick={() => handleDelete(_id)}
            class="btn btn-ghost text-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleTask;
