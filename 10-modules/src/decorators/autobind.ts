namespace App {
    export function AutoBind(
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
}
