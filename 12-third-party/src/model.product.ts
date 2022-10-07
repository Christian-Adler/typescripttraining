export class Product {
    constructor(public title: string, public price: number) {
    }

    getInformation() {
        return [this.title, `${this.price}`];
    }
}
