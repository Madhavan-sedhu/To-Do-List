import React, { useState } from "react";

export default function AddTask({
  setIsOpen,
  fetchData,
  isEditMode,
  isId,

  setMessage,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");

  function handleDate(e) {
    const selectedDate = new Date(e.target.value);
    console.log(selectedDate);
    const option = { day: "2-digit", month: "short", year: "numeric" };
    const date = selectedDate.toLocaleDateString("en-GB", option);

    setDuration(date);
  }

  async function handleAdd(e) {
    e.preventDefault();

    if (!title || !duration) return;
    const newTask = {
      title: title.trim(),
      description: description?.trim(),
      duration: duration,
    };

    try {
      let res, data;
      if (isEditMode) {
        res = await fetch(`/update/${isId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTask),
        });
      } else {
        res = await fetch("/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTask),
        });
      }
      data = await res.json();
      setMessage(data.message);
      setTitle(" ");
      setDescription(" ");
      setDuration(" ");

      await fetchData();
      setIsOpen((isOpen) => !isOpen);
    } catch (err) {
      setMessage(err);
    }
  }

  return (
    <div className="addTask-container">
      <h1>To-Do List</h1>
      <div className="input-container">
        <div className="header">
          <h2>Add Task</h2>
          <button
            id="close-button"
            onClick={() => setIsOpen((isOpen) => !isOpen)}
          >
            <img src="square-xmark-solid.svg" alt="close" />
          </button>
        </div>

        <form className="form-container" onSubmit={handleAdd}>
          <label>
            Title<span>*</span>
            <br />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            Descption (Optional)
            <br />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label>
            Duration<span>*</span>
            <br />
            <input type="date" value={duration} onChange={handleDate} />
          </label>
        </form>
      </div>
      <div className="btn-container">
        {/* <Button setIsOpen={setIsOpen}>Add Task</Button> */}
        <button id="add-button" onClick={handleAdd}>
          Add Task
        </button>
      </div>
    </div>
  );
}
