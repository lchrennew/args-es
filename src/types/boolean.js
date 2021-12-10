export { appendTo } from "./common/unique.js";
export const parse = value => {
    const enums = [ 'false', 'true' ]
    const normalized = (value ?? `${true}`).toLowerCase()
    const index = enums.indexOf(normalized)
    if (index < 0) throw `invalid boolean value ${normalized}`
    return !!index
}
export const globalDefault = false
export const name = 'boolean'
