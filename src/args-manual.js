export default class ArgsManual {
    #definition

    constructor(definition) {
        this.#definition = definition
    }

    print() {
        console.log(``)
        console.log(`Flags:`)
        for (const flag in this.#definition) {
            const def = this.#definition[flag]
            console.log(`  -${flag}  <${this.typeOf(flag).name}>\t  ${def.description} (default = ${JSON.stringify(this.defaultOf(flag))})`)
        }
    }
}
