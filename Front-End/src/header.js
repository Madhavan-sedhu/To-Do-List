import React from "react";

function Header({ setIsOpen }) {
  return (
    <div>
      <h1>To-Do List</h1>
      <div className="header-container">
        <div className="myTask-container">
          <h3>My Task</h3>
          <p>You have 3 task left</p>
        </div>
        <div>
          <button
            onClick={() => setIsOpen((isOpen) => !isOpen)}
            className="btn"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}
export default Header;
