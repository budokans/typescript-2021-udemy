export function Autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const newDescriptor = {
        enumerable: false,
        configurable: true,
        get() {
            const boundFunc = originalMethod.bind(this);
            return boundFunc;
        },
    };
    return newDescriptor;
}
