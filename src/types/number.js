export { appendTo } from "./common/unique.js";
export const parse = (value, defaultValue = globalDefault) => {
    const result = Number(value || defaultValue)
    if (isNaN(result)) throw `Invalid number value: ${JSON.stringify(value)}`
    return result
}
export const globalDefault = 0
export const name = 'number'
