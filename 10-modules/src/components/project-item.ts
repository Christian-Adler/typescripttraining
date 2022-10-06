/// <reference path="base-components.ts" />

namespace App {
    export class ProjectItem
        extends Component<HTMLUListElement, HTMLLIElement>
        implements Draggable {
        get persons() {
            if (this.project.numOfPeople === 1) return "1 person";
            return `${this.project.numOfPeople} persons`;
        }

        constructor(hostId: string, private project: Project) {
            super("single-project", hostId, false, project.id);
            this.configure();
            this.renderContent();
        }

        @AutoBind
        dragStartHandler(event: DragEvent): void {
            console.log("DragStart");
            // https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API
            event.dataTransfer!.setData("text/plain", this.project.id);
            event.dataTransfer!.effectAllowed = "move"; // Cursor
        }

        @AutoBind
        dragEndHandler(_event: DragEvent): void {
            console.log("DragEnd");
        }

        configure(): void {
            this.element.addEventListener("dragstart", this.dragStartHandler);
            this.element.addEventListener("dragend", this.dragEndHandler);
        }

        renderContent(): void {
            const project = this.project;
            this.element.querySelector("h2")!.textContent = project.title;
            this.element.querySelector("h3")!.textContent = this.persons + " assigned";
            this.element.querySelector("p")!.textContent = project.desc;
        }
    }
}
