import * as string from './types/string.js'

export default class ArgsSchema {
    #definition

    constructor(definition) {
        this.#definition = definition
    }

    defined(flag) {
        return flag.length === 1 && !!this.#definition[flag]
    }

    typeOf(flag) {
        if (!this.defined(flag)) throw `Undefined flag: ${JSON.stringify(flag)}`
        return this.#definition[flag].type ?? string
    }

    defaultOf(flag) {
        if (!this.defined(flag)) throw `Undefined flag: ${JSON.stringify(flag)}`
        return this.#definition[flag].default ?? this.typeOf(flag).globalDefault
    }

    defaults() {
        return Object.fromEntries(
            Object
                .entries(this.#definition)
                .map(entry => [ entry[0], this.defaultOf(entry[0]) ]))
    }
}
