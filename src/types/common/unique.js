export const appendTo = (args, arg) => {
    if (args[arg.flag] !== undefined) throw `Duplicated flag: -${arg.flag}`
    args[arg.flag] = arg.value
}
