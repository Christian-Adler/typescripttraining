import {Component} from "./base-components.js";
import {AutoBind} from "../decorators/autobind.js";
import {projectState} from "../state/project-state.js";
import {DragTarget} from "../models/drag-drop.js";
import {Project, ProjectStatus} from "../models/project.js";
import {ProjectItem} from "./project-item.js";

export class ProjectList
    extends Component<HTMLDivElement, HTMLElement>
    implements DragTarget {
    private assignedProjects: Project[] = [];

    constructor(private type: "active" | "finished") {
        super("project-list", "app", false, `${type}-projects`);

        this.configure();
        this.renderContent();
    }

    @AutoBind
    dragOverHandler(event: DragEvent): void {
        if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
            event.preventDefault(); // allow drop!
            const listEl = this.element.querySelector("ul")!;
            listEl.classList.add("droppable");
        }
    }

    @AutoBind
    dropHandler(event: DragEvent): void {
        const projectId = event.dataTransfer!.getData("text/plain");
        projectState.moveProject(
            projectId,
            this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
        );
    }

    @AutoBind
    dragLeaveHandler(_event: DragEvent): void {
        const listEl = this.element.querySelector("ul")!;
        listEl.classList.remove("droppable");
    }

    configure() {
        this.element.addEventListener("dragover", this.dragOverHandler);
        this.element.addEventListener("dragleave", this.dragLeaveHandler);
        this.element.addEventListener("drop", this.dropHandler);

        projectState.addListener((projects: Project[]) => {
            this.assignedProjects = projects.filter((proj) => {
                if (this.type === "active") return proj.status === ProjectStatus.Active;
                else return proj.status === ProjectStatus.Finished;
            });
            this.renderProjects();
        });
    }

    renderContent() {
        this.element.querySelector("ul")!.id = `${this.type}-project-lists`;
        this.element.querySelector("h2")!.textContent =
            this.type.toUpperCase() + " PROJECTS";
    }

    private renderProjects() {
        const listEl = document.getElementById(
            `${this.type}-project-lists`
        )! as HTMLUListElement;
        listEl.innerHTML = "";
        const ul = this.element.querySelector("ul")!;
        for (const proj of this.assignedProjects) {
            new ProjectItem(ul.id, proj);
        }
    }
}
