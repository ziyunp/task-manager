import { Button, Modal, Box, Stack, TextField } from "@mui/material";
import { useState, useCallback } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function CreateTaskComponent({
  createTask,
}: {
  createTask: (title: string, description: string) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);
  const handleChangeTitle: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = useCallback((e) => {
    setTitle(e.target.value);
  }, []);
  const handleChangeDescription: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = useCallback((e) => {
    setDescription(e.target.value);
  }, []);

  const handleCreateTask = useCallback(() => {
    if (title && description) {
      createTask(title, description);
      setTitle(undefined);
      setDescription(undefined);
      handleCloseModal();
    }
  }, [createTask, description, handleCloseModal, title]);

  return (
    <Stack>
      <Button variant="contained" size="large" onClick={handleOpenModal}>
        + New Task
      </Button>
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style }}>
          <h2>Create New Task</h2>
          <Stack spacing={2}>
            <TextField
              id="title"
              label="Title"
              variant="outlined"
              onChange={handleChangeTitle}
            />
            <TextField
              id="description"
              label="Description"
              variant="outlined"
              onChange={handleChangeDescription}
            />
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                size="large"
                onClick={handleCreateTask}
              >
                Create
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </Stack>
  );
}

export default CreateTaskComponent;
