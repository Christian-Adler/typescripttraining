/// <reference path="base-components.ts" />

namespace App {

    export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
        private titleInputElement: HTMLInputElement;
        private descInputElement: HTMLInputElement;
        private peopleInputElement: HTMLInputElement;

        constructor() {
            super("project-input", "app", true, "user-input");
            this.titleInputElement = this.element.querySelector(
                "#title"
            )! as HTMLInputElement;
            this.descInputElement = this.element.querySelector(
                "#description"
            )! as HTMLInputElement;
            this.peopleInputElement = this.element.querySelector(
                "#people"
            )! as HTMLInputElement;
            this.configure();
        }

        configure() {
            this.element.addEventListener("submit", this.submitHandler);
        }

        renderContent() {
        }

        private gatherUserInput(): [string, string, number] | void {
            const enteredTitle = this.titleInputElement.value;
            const enteredDesc = this.descInputElement.value;
            const enteredPeople = this.peopleInputElement.value;

            const titleValidatable: Validatable = {
                value: enteredTitle,
                required: true,
            };
            const descValidatable: Validatable = {
                value: enteredDesc,
                required: true,
                minLength: 5,
            };
            const peopleValidatable: Validatable = {
                value: +enteredPeople,
                required: true,
                min: 1,
                max: 5,
            };

            if (
                !validate(titleValidatable) ||
                !validate(descValidatable) ||
                !validate(peopleValidatable)
            ) {
                alert("Invalid input! Please try again.");
                return;
            }

            return [enteredTitle, enteredDesc, +enteredPeople];
        }

        @AutoBind
        private submitHandler(event: Event) {
            event.preventDefault();
            // console.log(this.titleInputElement.value);
            // console.log(this.descInputElement.value);
            // console.log(this.peopleInputElement.value);
            const userInput = this.gatherUserInput();
            if (Array.isArray(userInput)) {
                const [title, desc, people] = userInput;
                // console.log(title, desc, people);
                projectState.addProject(title, desc, people);
                this.clearInputs();
            }
        }

        private clearInputs() {
            this.titleInputElement.value = "";
            this.descInputElement.value = "";
            this.peopleInputElement.value = "";
        }
    }
}
