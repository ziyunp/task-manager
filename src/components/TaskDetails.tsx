import { Stack, Chip, Button } from "@mui/material";
import { green, grey } from "@mui/material/colors";
import { Task } from "../model/Task";
import { StatusDisplayMap } from "../StatusDisplayMap";
import { useCallback, useState } from "react";

function TaskDetails({
  task,
  runTask,
  cancelTask,
}: {
  task: Task;
  runTask: (id: string) => any;
  cancelTask: (id: string) => any;
}) {
  const [isCancelDisabled, setIsCancelDisabled] = useState(false);
  const handleCancel = useCallback(async () => {
    setIsCancelDisabled(true);
    cancelTask(task.id)();
  }, [cancelTask, task.id]);

  return (
    <Stack
      key={task.id}
      direction={"row"}
      sx={{ border: "1px solid #eee", p: 2 }}
    >
      <Stack width={800}>
        <Stack>
          <strong>{task.title}</strong>
        </Stack>
        <Stack>{task.description}</Stack>
      </Stack>
      <Stack width={600}>
        <Chip
          sx={{
            width: 100,
          }}
          label={StatusDisplayMap[task.status].label}
          color={StatusDisplayMap[task.status].state}
        />
      </Stack>
      <Stack width={500} direction={"row"} spacing={2}>
        {task.status === "PENDING" && (
          <Button
            variant={"contained"}
            onClick={runTask(task.id)}
            sx={{ width: "120px", backgroundColor: green[700] }}
          >
            Run
          </Button>
        )}
        {task.status === "IN_PROGRESS" && (
          <Button
            disabled={isCancelDisabled}
            variant={"contained"}
            onClick={handleCancel}
            sx={{ width: "120px", backgroundColor: grey[700] }}
          >
            Cancel
          </Button>
        )}
      </Stack>
    </Stack>
  );
}
export default TaskDetails;
