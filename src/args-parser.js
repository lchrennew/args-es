import * as segmentStrategies from './segment-strategies.js'

export default class ArgsParser {
    /***
     * @type ArgsSchema
     */
    #schema

    /***
     *
     * @param schema : ArgsSchema
     */
    constructor(schema) {
        this.#schema = schema
    }

    parse(argsString, extractSegments = segmentStrategies.simple) {
        const args = {}
        const append = arg => this.#schema.typeOf(arg.flag).appendTo(args, arg)
        const segments = extractSegments(argsString)

        for (let i = 0; i < segments.length; i++) {
            const flag = this.#parseFlag(segments[i])
            const { value, flagLike } = this.#parseValue(flag, segments[i + 1])
            if (!flagLike) i++
            append({ flag, value })
        }

        return { ...this.#schema.defaults(), ...args }
    }

    #validateFlag(segment) {
        return segment?.match(/^-.$/) && this.#schema.defined(segment[1])
    }

    #parseFlag(segment) {
        if (!this.#validateFlag(segment)) throw `Invalid flag: ${segment}`
        return segment[1]
    }

    #parseValue(flag, segment) {
        const defaultValue = this.#schema.defaultOf(flag)
        const flagLike = this.#validateFlag(segment)
        const type = this.#schema.typeOf(flag)
        return { value: type.parse(flagLike ? undefined : segment, defaultValue), flagLike }
    }
}
