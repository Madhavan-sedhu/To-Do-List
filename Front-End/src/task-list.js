import { useState } from "react";

function TaskList({
  list,
  fetchData,
  setIsEditMode,
  setIsId,
  setIsOpen,
  setMessage,
}) {
  return (
    <div>
      {list?.map((item) => (
        <List
          item={item}
          key={item._id}
          fetchData={fetchData}
          setIsEditMode={setIsEditMode}
          setIsId={setIsId}
          setIsOpen={setIsOpen}
          setMessage={setMessage}
        />
      ))}
    </div>
  );
}
function List({
  item,
  fetchData,
  setIsEditMode,
  setIsId,
  setIsOpen,
  setMessage,
}) {
  const [isChecked, setIsChecked] = useState(false);
  function handleEditButton(id) {
    setIsOpen((isOpen) => !isOpen);
    setIsEditMode(true);
    setIsId(id);
  }
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      setMessage(data);
    } catch (err) {
      console.log(err);
    }
    fetchData();
  };

  return (
    <ul>
      <li className="list-container">
        <div className="checkBox-container">
          <input
            id="checkBox"
            type="checkBox"
            onChange={() => setIsChecked((isChecked) => !isChecked)}
          />
          <div>
            <p id="description">
              <span style={isChecked ? { textDecoration: "line-through" } : {}}>
                {item.title}
              </span>
            </p>
            <p>{item.description}</p>
            <p id="due-date">{`Due ${item.duration} `}</p>
          </div>
        </div>
        <div className="img-container">
          <img
            id="edit"
            src="pen-solid.svg"
            alt="Edit"
            onClick={() => handleEditButton(item._id)}
          />
          <img
            id="delete"
            src="trash-solid.svg"
            alt="delete"
            onClick={() => handleDelete(item._id)}
          />
        </div>
      </li>
    </ul>
  );
}
export default TaskList;
