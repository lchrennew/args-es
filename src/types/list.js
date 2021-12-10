export const parse = (value, defaultValue = globalDefault) => {
    return value?.split(',') ?? globalDefault
}
export const appendTo = (args, arg) => {
    args[arg.flag] ??= []
    args[arg.flag].push(...arg.value)
}
export const globalDefault = []
