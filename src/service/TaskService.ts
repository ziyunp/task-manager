export interface TaskService {
  runTask(id: string): Promise<boolean>;
  cancelTask(id: string): Promise<boolean>;
}
