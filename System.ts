export default class System<T extends Record<string, unknown>> {
    constructor(
        public state: T, 
        public inputs: Record<string, (data: unknown) => Promise<Partial<T>> | Partial<T>> = {},
        public outputs: Record<string, (state: T) => Promise<unknown> | unknown> = {}
    ) {}

    async input(type?: string, data?: unknown) {
        if (!type) return await this.output()
        if (!this.inputs[type]) throw new Error("No input function found for input " + type)

        const newState = this.inputs[type].call(this, data)
        Object.entries(newState).forEach(entry => this.state[entry[0]] = entry[1])

        return await this.output()
    }

    async output() {
        return await Promise.all(Object.values(this.outputs).map(outputFcn => outputFcn(this.state)))
    }
}