import "./App.css";
import Main from "./Main";
import Task from "./TaskComponent";
import AddTask from "./Add-task";

import { useEffect, useState } from "react";
function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [list, setList] = useState(null);
  const [isEditMode, setIsEditMode] = useState();
  const [isId, setIsId] = useState(null);

  const [message, setMessage] = useState("");
  console.log(message);
  async function fetchData() {
    try {
      const res = await fetch("/Task");
      const data = await res.json();

      setList(data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Main>
        <Task
          setIsOpen={setIsOpen}
          list={list}
          fetchData={fetchData}
          setIsEditMode={setIsEditMode}
          setIsId={setIsId}
          setMessage={setMessage}
        />
        {isOpen && (
          <AddTask
            isEditMode={isEditMode}
            setIsOpen={setIsOpen}
            fetchData={fetchData}
            isId={isId}
            setMessage={setMessage}
          />
        )}
      </Main>
    </>
  );
}

export default App;
