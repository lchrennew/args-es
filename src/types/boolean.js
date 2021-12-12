export { appendTo } from "./common/unique.js";
export const parse = (value = 'true') => {
    const enums = [ 'false', 'true' ]
    const normalized = `${value}`.toLowerCase()
    const index = enums.indexOf(normalized)
    if (index < 0) throw `Invalid boolean value: ${JSON.stringify(value)}`
    return !!index
}
export const globalDefault = false
export const name = 'boolean'
