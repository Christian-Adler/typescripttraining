enum ProjectStatus {
  Active,
  Finished,
}

class Project {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly desc: string,
    public readonly numOfPeople: number,
    public status: ProjectStatus
  ) {}
}

// State
type Listener<T> = (items: T[]) => void;

abstract class State<T> {
  protected listeners: Listener<T>[] = [];
  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

class ProjectState extends State<Project> {
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

    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice()); // clone projects
    }
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
  if (typeof value === "string") {
    value = value.trim();
    if (validatableInput.minLength && validatableInput.minLength >= 0)
      isValid = isValid && value.length >= validatableInput.minLength;
    if (validatableInput.maxLength && validatableInput.maxLength > 0)
      isValid = isValid && value.length <= validatableInput.maxLength;
  } else {
    // if(typeof value==='number'){
    if (typeof validatableInput.min === "number")
      isValid = isValid && value >= validatableInput.min;
    if (typeof validatableInput.max === "number")
      isValid = isValid && value <= validatableInput.max;
  }
  return isValid;
}

function AutoBind(
  _target: any,
  _propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      // Adding an extra layer to the method
      // this refers to the object we originally defined the method
      return originalMethod.bind(this);
    },
  };
  return adjDescriptor;
}

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  private templateElement: HTMLTemplateElement;
  private hostElement: T;
  protected readonly element: U;

  constructor(
    templateId: string,
    hostElementId: string,
    insertAtStart: boolean,
    newElementId?: string
  ) {
    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId)! as T;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as U;
    if (newElementId) this.element.id = newElementId;

    this.attach(insertAtStart);
  }

  private attach(insertAtStart: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtStart ? "afterbegin" : "beforeend",
      this.element
    );
  }

  abstract configure(): void;
  abstract renderContent(): void;
}

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> {
  get persons() {
    if (this.project.numOfPeople === 1) return "1 person";
    return `${this.project.numOfPeople} persons`;
  }

  constructor(hostId: string, private project: Project) {
    super("single-project", hostId, false, project.id);
    this.configure();
    this.renderContent();
  }

  configure(): void {}

  renderContent(): void {
    const project = this.project;
    this.element.querySelector("h2")!.textContent = project.title;
    this.element.querySelector("h3")!.textContent = this.persons + " assigned";
    this.element.querySelector("p")!.textContent = project.desc;
  }
}

class ProjectList extends Component<HTMLDivElement, HTMLElement> {
  private assignedProjects: Project[] = [];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);

    this.configure();
    this.renderContent();
  }

  configure() {
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

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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

  renderContent() {}

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

const projectInput = new ProjectInput();

const activeProjList = new ProjectList("active");
const finishedProjList = new ProjectList("finished");
