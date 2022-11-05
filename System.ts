export default class System<T> {
    constructor(
        public state: T, 
        public inputs?: Record<string, (data: unknown) => Promise<Partial<T>> | Partial<T>>,
        public outputs?: Record<string, (T) => Promise<unknown> | unknown >
    ) {}

    async input(type?: string, data?: unknown) {
        if (!type) return await this.output()
        if (!this.inputs[type]) throw new Error("No input function found for input " + type)

        const newState = this.inputs[type].call(this, data)
        Object.entries(newState).forEach(key => this.state[key])

        return await this.output()
    }

    async output() {
        return await Promise.all(Object.entries(outputs).map(entry => entry[1](this.state)))
    }
}