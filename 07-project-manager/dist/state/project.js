import { Project, ProjectStatus } from "../models/project.js";
class State {
    constructor() {
        this.listeners = [];
    }
    addListener(newListener) {
        this.listeners.push(newListener);
    }
}
class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new ProjectState();
        }
        return this.instance;
    }
    addProject(title, description, numOfPeople) {
        const id = Math.random().toString();
        const project = new Project(id, title, description, numOfPeople, ProjectStatus.Active);
        this.projects.push(project);
        this.callListeners();
    }
    moveProject(projectId, newStatus) {
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
