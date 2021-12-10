export const parse = (value, defaultValue = globalDefault) => {
    const result = Number(value || defaultValue)
    if (isNaN(result)) throw `invalid number value ${value}`
    return result
}
export const appendTo = (args, arg) => {
    if (args[arg.flag] !== undefined) throw `Duplicated arg ${arg.flag}`
    args[arg.flag] = arg.value
}
export const globalDefault = 0
