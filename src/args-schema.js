export default class ArgsSchema {
    #definition

    constructor(definition) {
        this.#definition = definition
    }

    defined(flag) {
        return !!this.#definition[flag]
    }

    typeOf(flag) {
        return this.#definition[flag].type
    }

    defaultOf(flag) {
        return this.#definition[flag].default ?? this.#definition[flag].type.globalDefault
    }

    defaults() {
        return Object.fromEntries(
            Object
                .entries(this.#definition)
                .map(entry => [ entry[0], this.defaultOf(entry[0]) ]))
    }

    manual() {
        console.log(``)
        console.log(`Flags:`)
        for (const flag in this.#definition) {
            const def = this.#definition[flag]
            console.log(`  -${flag}  <${this.typeOf(flag).name}>\t  ${def.description} (default = ${JSON.stringify(this.defaultOf(flag))})`)
        }
    }
}
