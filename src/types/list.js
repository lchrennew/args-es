export const parse = (value, defaultValue = globalDefault) => {
    return value?.split(',') ?? defaultValue
}
export const appendTo = (args, arg) => {
    args[arg.flag] ??= []
    args[arg.flag].push(...arg.value)
}
export const globalDefault = []
export const name = 'list'
