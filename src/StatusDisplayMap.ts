import { Status } from "./model/Task";

export const StatusDisplayMap: Record<
  Status,
  {
    label: string;
    state: "primary" | "success" | "error" | "warning" | "default";
  }
> = {
  PENDING: { label: "Pending", state: "default" },
  IN_PROGRESS: { label: "In Progress", state: "primary" },
  COMPLETED: { label: "Completed", state: "success" },
  CANCELLED: { label: "Cancelled", state: "warning" },
};
