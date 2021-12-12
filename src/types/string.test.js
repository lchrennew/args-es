import { parse } from "./string.js";

describe('parse string without defaultValue', () => {
    test('undefined should be empty string', () => {
        expect(parse()).toBe('')
    })

    test('empty string should be empty string', () => {
        expect(parse('')).toBe('')
    })

    test('non-empty string should be the string', () => {
        expect(parse('abc')).toBe('abc')
    })
})

describe('parse string with defaultValue', () => {
    test('undefined should be defaultValue', () => {
        expect(parse(undefined, 'hello')).toBe('hello')
    })

    test('empty string should be defaultValue', () => {
        expect(parse('', 'hi')).toBe('hi')
    })

    test('non-empty string should be the string', () => {
        expect(parse('world', 'hello')).toBe('world')
    })
})
