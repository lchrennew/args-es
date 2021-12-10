export default class ArgsParser {
    #schema

    constructor(schema) {
        this.#schema = schema
    }

    parse(argsString) {
        const args = {}
        const append = arg => this.#schema.typeOf(arg.flag).appendTo(args, arg)
        const parts = argsString.split(' ').filter(part => part)

        for (let i = 0; i < parts.length; i++) {
            const flag = this.#parseFlag(parts[i])
            const { value, flagLike } = this.#parseValue(flag, parts[i + 1])
            if (!flagLike) i++
            append({ flag, value })
        }

        return { ...this.#schema.defaults(), ...args }
    }

    #validateFlag(part) {
        return part?.match(/^-.$/) && this.#schema.defined(part[1])
    }

    #parseFlag(part) {
        if (!this.#validateFlag(part)) throw `Invalid flag: ${part}`
        return part[1]
    }

    #parseValue(flag, part) {
        const defaultValue = this.#schema.defaultOf(flag)
        const flagLike = this.#validateFlag(part)
        const type = this.#schema.typeOf(flag)
        return { value: type.parse(flagLike ? undefined : part, defaultValue), flagLike }
    }
}
