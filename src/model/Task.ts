export type Status = "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
}
