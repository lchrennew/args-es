export default class Parser {
    schema

    constructor(schema) {
        this.schema = schema
    }

    parse(argsString) {
        const args = {}
        const append = arg => this.schema.typeOf(arg.flag).appendTo(args, arg)
        const parts = argsString.split(' ').filter(part => part)

        for (let i = 0; i < parts.length; i++) {
            const flag = this.parseFlag(parts[i])
            const value = this.parseValue(flag, parts[i + 1])
            const isValueFlag = value === undefined
            if (!isValueFlag) i++
            append({ flag, value })
        }

        return { ...this.schema.defaults(), ...args }
    }

    checkFlag(part) {
        return part?.match(/^-.$/) && this.schema.defined(part[1])
    }

    parseFlag(part) {
        if (!this.checkFlag(part)) throw `invalid flag ${part}`
        return part[1]
    }

    parseValue(flag, part) {
        if (this.checkFlag(part)) return
        const type = this.schema.typeOf(flag)
        return type.parse(part, this.schema.defaultOf(flag))
    }
}
