export default class Schema {
    definition

    constructor(definition) {
        this.definition = definition
    }

    defined(flag) {
        return !!this.definition[flag]
    }

    typeOf(flag) {
        return this.definition[flag].type
    }

    defaultOf(flag) {
        return this.definition[flag].default ?? this.definition[flag].type.globalDefault
    }

    defaults() {
        return Object.fromEntries(
            Object
                .entries(this.definition)
                .map(entry => [ entry[0], this.defaultOf(entry[0]) ]))
    }

    manual() {
        console.log(`FLAG\tTYPE\t\tDEFAULT\tDESCRIPTION`)

        for (const flag in this.definition) {
            const def = this.definition[flag]
            console.log(`-${flag}\t[${this.typeOf(flag).name}]\t${this.defaultOf(flag)}\t${def.description}. `)
        }
    }
}
