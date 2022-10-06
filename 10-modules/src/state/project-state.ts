namespace App {
    // State
    type Listener<T> = (items: T[]) => void;

    abstract class State<T> {
        protected listeners: Listener<T>[] = [];

        addListener(listenerFn: Listener<T>) {
            this.listeners.push(listenerFn);
        }
    }

    export class ProjectState extends State<Project> {
        private static instance: ProjectState;
        private projects: Project[] = [];

        private constructor() {
            super();
        }

        static getInstance() {
            if (!this.instance) this.instance = new ProjectState();
            return this.instance;
        }

        addProject(title: string, desc: string, numOfPeople: number) {
            const newProject = new Project(
                new Date().getTime() + "-" + Math.random().toString(),
                title,
                desc,
                numOfPeople,
                ProjectStatus.Active
            );

            this.projects.push(newProject);

            this.updateListeners();
        }

        moveProject(projectId: string, newStatus: ProjectStatus) {
            const project = this.projects.find((p) => p.id === projectId);
            if (project && project.status !== newStatus) {
                project.status = newStatus;
                this.updateListeners();
            }
        }

        private updateListeners() {
            for (const listenerFn of this.listeners) {
                listenerFn(this.projects.slice()); // clone projects
            }
        }
    }

    export const projectState = ProjectState.getInstance();
}
