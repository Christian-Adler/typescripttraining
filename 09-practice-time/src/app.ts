class ProjectInput {
    private templateElement: HTMLTemplateElement;
    private hostElement: HTMLDivElement;
    private readonly element: HTMLFormElement;

    private titleInputElement: HTMLInputElement;
    // private descInputElement: HTMLInputElement;
    // private peopleInputElement: HTMLInputElement;

    constructor() {
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.element.id = 'user-input';

        this.titleInputElement = this.element.querySelector('#title')! as HTMLInputElement;
        // this.descInputElement = this.element.querySelector('#description')! as HTMLInputElement;
        // this.peopleInputElement = this.element.querySelector('#people')! as HTMLInputElement;

        this.configure();

        this.attach();
    }

    private submitHandler(event: Event) {
        event.preventDefault();
        console.log(this.titleInputElement.value);
    }

    private configure() {
        this.element.addEventListener('submit', this.submitHandler.bind(this));

    }

    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}

const projectInput = new ProjectInput();
