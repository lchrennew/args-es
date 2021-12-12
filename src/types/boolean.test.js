import { parse } from "./boolean.js";

test('undefined should be true', () => {
    expect(parse()).toBe(true)
})

test('false should be false', () => {
    expect(parse('false')).toBe(false)
})

test('true should be true', () => {
    expect(parse('true')).toBe(true)
})

test('case should be case-insensitive', () => {
    expect(parse('False')).toBe(false)
    expect(parse('truE')).toBe(true)
})

test('invalid value should raise exception with tipping the value', () => {
    expect(() => parse('')).toThrowError('Invalid boolean value: ""')
    expect(() => parse('No')).toThrowError('Invalid boolean value: "No"')
})
