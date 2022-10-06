export enum ProjectStatus {
    Active,
    Finished,
}

export class Project {
    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly desc: string,
        public readonly numOfPeople: number,
        public status: ProjectStatus
    ) {
    }
}
