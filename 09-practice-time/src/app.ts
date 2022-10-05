enum ProjectStatus {Active, Finished}

class Project {
    constructor(public readonly id: string,
                public readonly title: string,
                public readonly desc: string,
                public readonly numOfPeople: number, public status: ProjectStatus) {
    }
}

// State
type Listener = (items: Project[]) => void;

class ProjectState {
    private static instance: ProjectState;
    private projects: Project[] = [];
    private listeners: Listener[] = [];

    private constructor() {
    }

    static getInstance() {
        if (!this.instance)
            this.instance = new ProjectState();
        return this.instance;
    }

    addProject(title: string, desc: string, numOfPeople: number) {
        const newProject = new Project(new Date().getTime() + '-' + Math.random().toString(), title, desc, numOfPeople, ProjectStatus.Active);

        this.projects.push(newProject);

        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice()
            ); // clone projects
        }
    }

    addListener(listenerFn: Listener) {
        this.listeners.push(listenerFn);
    }
}

const projectState = ProjectState.getInstance();

// Validation
interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

function validate(validatableInput: Validatable) {
    let isValid = true;
    let value = validatableInput.value;
    if (validatableInput.required) {
        isValid = isValid && value.toString().trim().length !== 0;
    }
    if (typeof value === 'string') {
        value = value.trim();
        if (validatableInput.minLength && validatableInput.minLength >= 0)
            isValid = isValid && value.length >= validatableInput.minLength;
        if (validatableInput.maxLength && validatableInput.maxLength > 0)
            isValid = isValid && value.length <= validatableInput.maxLength;
    } else { // if(typeof value==='number'){
        if (typeof validatableInput.min === 'number')
            isValid = isValid && value >= validatableInput.min;
        if (typeof validatableInput.max === "number")
            isValid = isValid && value <= validatableInput.max;
    }
    return isValid;
}


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

class ProjectList {
    private templateElement: HTMLTemplateElement;
    private hostElement: HTMLDivElement;
    private readonly element: HTMLElement;
    private assignedProjects: Project[] = [];

    constructor(private type: 'active' | 'finished') {
        this.templateElement = document.getElementById('project-list')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLElement;
        this.element.id = `${this.type}-projects`;

        projectState.addListener((projects: Project[]) => {
            this.assignedProjects = projects;
            this.renderProjects();
        });

        this.attach();
        this.renderContent();
    }

    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-project-lists`)! as HTMLUListElement;
        for (const proj of this.assignedProjects) {
            const listItem = document.createElement('li');
            listItem.textContent = proj.title;
            listEl.appendChild(listItem);
        }
    }

    private renderContent() {
        this.element.querySelector('ul')!.id = `${this.type}-project-lists`;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }

    private attach() {
        this.hostElement.insertAdjacentElement('beforeend', this.element);
    }
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

        const titleValidatable: Validatable = {value: enteredTitle, required: true};
        const descValidatable: Validatable = {value: enteredDesc, required: true, minLength: 5};
        const peopleValidatable: Validatable = {value: +enteredPeople, required: true, min: 1, max: 5};

        if (
            !validate(titleValidatable) ||
            !validate(descValidatable) ||
            !validate(peopleValidatable)
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
            // console.log(title, desc, people);
            projectState.addProject(title, desc, people);
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

const activeProjList = new ProjectList('active');
const finishedProjList = new ProjectList('finished');
