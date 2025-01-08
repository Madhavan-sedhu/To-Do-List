import Header from "./header";
import TaskList from "./task-list";
export default function Task({
  setIsOpen,
  list,
  fetchData,
  setIsEditMode,
  setIsId,
  setMessage,
}) {
  return (
    <div className="task-container">
      <Header setIsOpen={setIsOpen} />

      <TaskList
        setIsOpen={setIsOpen}
        list={list}
        fetchData={fetchData}
        setIsEditMode={setIsEditMode}
        setIsId={setIsId}
        setMessage={setMessage}
      />
    </div>
  );
}
