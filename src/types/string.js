export const parse = (value, defaultValue = globalDefault) => value ?? defaultValue
export const appendTo = (args, arg) => {
    if (args[arg.flag] !== undefined) throw `Duplicated arg ${arg.flag}`
    args[arg.flag] = arg.value
}
export const globalDefault = ''
