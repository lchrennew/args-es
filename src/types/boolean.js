export const parse = (value, defaultValue = globalDefault) => {
    const enums = [ 'false', 'true' ]
    const normalized = (value ?? `${defaultValue}`).toLowerCase()
    const index = enums.indexOf(normalized)
    if (index < 0) throw `invalid boolean value ${normalized}`
    return !!index
}
export const appendTo = (args, arg) => {
    if (args[arg.flag] !== undefined) throw `Duplicated arg ${arg.flag}`
    args[arg.flag] = arg.value
}
export const globalDefault = false
