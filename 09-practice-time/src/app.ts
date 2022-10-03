function AutoBind(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true, enumerable: false,
        get() { // Adding an extra layer to the method
            // this refers to the object we originally defined the method
            return originalMethod.bind(this);
        }
    };
    return adjDescriptor;
}

class ProjectInput {
    private templateElement: HTMLTemplateElement;
    private hostElement: HTMLDivElement;
    private readonly element: HTMLFormElement;

    private titleInputElement: HTMLInputElement;
    private descInputElement: HTMLInputElement;
    private peopleInputElement: HTMLInputElement;

    constructor() {
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.element.id = 'user-input';

        this.titleInputElement = this.element.querySelector('#title')! as HTMLInputElement;
        this.descInputElement = this.element.querySelector('#description')! as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people')! as HTMLInputElement;

        this.configure();

        this.attach();
    }

    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDesc = this.descInputElement.value;
        const enteredPeople = this.peopleInputElement.value;

        if (enteredTitle.trim().length === 0 ||
            enteredDesc.trim().length === 0 ||
            enteredPeople.trim().length === 0
        ) {
            alert('Invalid input! Please try again.');
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
            console.log(title, desc, people);
            this.clearInputs();
        }
    }

    private clearInputs() {
        this.titleInputElement.value = '';
        this.descInputElement.value = '';
        this.peopleInputElement.value = '';
    }

    private configure() {
        this.element.addEventListener('submit', this.submitHandler);

    }

    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}

const projectInput = new ProjectInput();

