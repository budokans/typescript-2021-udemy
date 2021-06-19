import { Project, ProjectStatus } from "../models/project.js";

type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(newListener: Listener<T>) {
    this.listeners.push(newListener);
  }
}

class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ProjectState();
    }
    return this.instance;
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const id = Math.random().toString();
    const project = new Project(
      id,
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    );
    this.projects.push(project);

    this.callListeners();
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find((proj) => proj.id === projectId);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.callListeners();
    }
  }

  callListeners() {
    for (const listener of this.listeners) {
      listener(this.projects.slice());
    }
  }
}

export const projectStateManager = ProjectState.getInstance();
