import { TaskService } from "./TaskService";

export class MockTaskService implements TaskService {
  private runningTasks: Record<string, NodeJS.Timeout> = {};
  runTask(id: string): Promise<boolean> {
    const delay = this.getMockDelay();
    return new Promise((resolve) => {
      this.runningTasks[id] = setTimeout(() => resolve(true), delay);
    });
  }

  cancelTask(id: string): Promise<boolean> {
    // Cancel running process
    if (this.runningTasks[id] !== undefined) {
      clearTimeout(this.runningTasks[id]);
    }
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 2000);
    });
  }

  private getMockDelay() {
    const MIN_DELAY = 30_000;
    const MAX_DELAY = 60_000;
    return Math.random() * (MAX_DELAY - MIN_DELAY) + MIN_DELAY;
  }
}
