import React from "react";
import { MockTaskService } from "./service/MockTaskService";
import { TaskService } from "./service/TaskService";

interface ApplicationContext {
  service: TaskService;
}
export const appContext: ApplicationContext = {
  service: new MockTaskService(),
};
export const AppContext = React.createContext(appContext);
