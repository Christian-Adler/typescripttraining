import {IsNotEmpty, IsNumber, IsPositive} from 'class-validator';

export class Product {
    @IsNotEmpty()
    private readonly title: string;
    @IsNumber()
    @IsPositive()
    private readonly price: number

    constructor(t: string, p: number) {
        this.title = t;
        this.price = p;
    }

    getInformation() {
        return [this.title, `${this.price}`];
    }
}
