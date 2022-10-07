import 'reflect-metadata';
import {plainToInstance} from "class-transformer";
import _ from 'lodash';
import {Product} from "./model.product";
import {validate} from "class-validator";

console.log(_.shuffle([1, 2, 3]));

// const p1 = new Product('A book', 12.99);
// console.log(p1.getInformation());

// from Server...
const products = [{title: 'Title 1', price: 12.34}, {title: 'T2', price: 1.34}];
// manually transform
const loadedProducts: Product[] = products.map(p => new Product(p.title, p.price));
for (const loadedProduct of loadedProducts) {
    console.log(loadedProduct.getInformation());
}
// per lib
const loadedByTransformer = plainToInstance(Product, products)
for (const loadedProduct of loadedByTransformer) {
    console.log(loadedProduct.getInformation());
}

// Validation
const newProd = new Product('', -5);
validate(newProd).then(errors => {
    if (errors.length > 0) {
        console.log('VALIDATION ERRORS!', errors);
    } else
        console.log(newProd.getInformation());
})
