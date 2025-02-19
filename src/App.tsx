import { useCallback, useContext, useMemo, useState } from "react";
import { Status, Task } from "./model/Task";
import { Stack } from "@mui/material";
import CreateTaskComponent from "./components/CreateTaskComponent";
import { AppContext } from "./AppContext";
import TaskDetails from "./components/TaskDetails";

const tasks: Task[] = [
  {
    id: "0",
    title: "Order patient records",
    description: "Get all medical records for the patient",
    status: "PENDING",
  },
  {
    id: "1",
    title: "Schedule an appointment",
    description: "Make a new appointment for the patient",
    status: "COMPLETED",
  },
];
// Mutate the tasks (the mutation should be done properly in the backend)
const updateTaskStatus = (id: string, status: Status) => {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex > -1) {
    tasks[taskIndex].status = status;
  }
};
function App() {
  const { service } = useContext(AppContext);
  const [taskList, setTaskList] = useState(tasks);
  const sortedList = useMemo(
    () =>
      taskList.sort((a, b) => {
        return a.id > b.id ? 1 : -1;
      }),
    [taskList]
  );
  const handleCreateTask = useCallback((title: string, description: string) => {
    tasks.push({
      id: tasks.length.toString(),
      title,
      description,
      status: "PENDING",
    });
    setTaskList([...tasks]);
  }, []);

  const handleRun = useCallback(
    (id: string) => async () => {
      updateTaskStatus(id, "IN_PROGRESS");
      setTaskList([...tasks]);
      const res = await service.runTask(id);
      // TODO: error handling
      if (res) {
        updateTaskStatus(id, "COMPLETED");
        setTaskList([...tasks]);
      }
    },
    [service]
  );

  const handleCancel = useCallback(
    (id: string) => async () => {
      const res = await service.cancelTask(id);
      if (res) {
        updateTaskStatus(id, "CANCELLED");
        setTaskList([...tasks]);
      }
    },
    [service]
  );

  return (
    <Stack paddingX={10} paddingY={5}>
      <h1>Task Manager</h1>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <h2>All Tasks</h2>
        <CreateTaskComponent createTask={handleCreateTask} />
      </Stack>
      <Stack>
        <Stack rowGap={1}>
          {sortedList.map((task) => (
            <TaskDetails
              task={task}
              runTask={handleRun}
              cancelTask={handleCancel}
            />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}

export default App;
